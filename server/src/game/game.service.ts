import {
	BadRequestException,
	Inject,
	Injectable,
	InternalServerErrorException,
	Logger,
	NotFoundException
} from "@nestjs/common";
import cuid from "cuid";
import { Db, ObjectId, UpdateQuery } from "mongodb";
import { User } from "../user/user.type";
import { shuffle } from "../utils";
import { Deck } from "../utils/deck";
import {
	AskCardInput,
	CallSetInput,
	CreateTeamsInput,
	DeclineCardInput,
	GiveCardInput
} from "./game.inputs";
import { Game, GameStatus, MoveType, Player } from "./game.type";

@Injectable()
export class GameService {
	constructor(@Inject("Database") private readonly db: Db) {}
	private logger = new Logger("GameService");

	async createGame(user: User) {
		const { insertedId } = await this.db
			.collection<Game>("games")
			.insertOne({
				code: cuid.slug().toUpperCase(),
				playerCount: 6,
				createdBy: user,
				players: [{ ...user, hand: [], team: "" }],
				status: GameStatus.NOT_STARTED,
				teams: []
			})
			.catch((err) => {
				this.logger.error(err);
				throw new InternalServerErrorException();
			});

		this.logger.log(`Game created: ${insertedId}`);
		return insertedId;
	}

	async getGameById(_id: string | ObjectId) {
		if (typeof _id === "string") _id = new ObjectId(_id);

		const game = await this.db
			.collection<Game>("games")
			.findOne({ _id })
			.catch((err) => {
				this.logger.error(err);
				throw new InternalServerErrorException();
			});

		if (!game) throw new NotFoundException("Game Not Found!");
		return game;
	}

	async joinGame(code: string, user: User) {
		let game = await this.getGameByCode(code);

		if (!game.players.find(({ _id }) => user._id.equals(_id))) {
			if (game.players.length === game.playerCount) {
				throw new BadRequestException("Game Capacity Full!");
			}

			const players = game.players.concat({ ...user, hand: [], team: "" });
			let updateQuery: UpdateQuery<Game> = { $set: { players } };

			if (players.length === game.playerCount)
				updateQuery = { $set: { players, status: GameStatus.PLAYERS_READY } };

			game = await this.updateGameById(game._id, updateQuery);
		}

		return game;
	}

	async createTeams({ gameId, teams }: CreateTeamsInput) {
		let { players, playerCount, _id } = await this.getGameById(gameId);

		if (players.length !== playerCount) {
			throw new BadRequestException(
				`Need ${playerCount} players to create teams !`
			);
		}

		let teamNames = teams;
		teams = shuffle([...teams, ...teams, ...teams]);
		players = players.map((player, i) => ({ ...player, team: teams[i] }));

		const game = await this.updateGameById(_id, {
			$set: {
				teams: teamNames.map((name) => ({ name, score: 0 })),
				players,
				status: GameStatus.TEAMS_CREATED
			}
		});
		return game;
	}

	async startGame(gameId: string) {
		let game = await this.getGameById(gameId);
		if (game.status !== GameStatus.TEAMS_CREATED)
			throw new BadRequestException("Teams Not Created!");

		const deck = new Deck();
		deck
			.removeCardsOfRank("SEVEN")
			.generateHands(game.playerCount)
			.map(Deck.sortHand)
			.forEach((hand, i) => {
				game.players[i].hand = hand.map((card) => card.getCardString());
			});

		game = await this.updateGameById(game._id, {
			$set: {
				players: game.players,
				status: GameStatus.IN_PROGRESS,
				currentMove: {
					type: MoveType.TURN,
					description: `${game.createdBy.name}'s Turn`,
					turn: game.createdBy._id.toHexString()
				}
			}
		});

		return game;
	}

	async callSet({ callData, gameId, set }: CallSetInput, user: User) {
		let game = await this.getGameById(gameId);
		let callSetData: Record<string, string[]> = JSON.parse(callData);
		let callCards = Object.keys(callSetData).flatMap(
			(userId) => callSetData[userId]
		);

		const { players } = game;

		const mePlayer = players.find(({ _id }) => _id.equals(user._id))!;
		let myTeamPlayers = players.filter(({ team }) => team === mePlayer.team);

		let flag = 0;
		myTeamPlayers.forEach(({ _id, hand }) => {
			callSetData[_id.toHexString()] = callSetData[_id.toHexString()].filter(
				(card) => !hand.includes(card)
			);

			if (callSetData[_id.toHexString()].length !== 0) flag = 1;
		});

		players.forEach(({ hand }, i) => {
			callCards.forEach((card) => {
				const idx = hand.indexOf(card);
				if (idx >= 0) hand = hand.slice(0, idx).concat(hand.slice(idx + 1));
			});

			players[i].hand = hand;
		});

		return this.updateGameById(gameId, {
			$set: {
				secondLastMove: game.lastMove,
				lastMove: game.currentMove,
				players,
				teams: game.teams.map(({ name, score }) => {
					if (
						(flag === 0 && name === mePlayer.team) ||
						(flag !== 0 && name !== mePlayer.team)
					)
						return { name, score: score + 1 };
					else return { name, score };
				}),
				currentMove:
					flag === 0
						? {
								description: `${user.name} called ${set} correctly.`,
								type: MoveType.CALL_SUCCESS,
								turn: user._id.toHexString()
						  }
						: {
								description: `${user.name} called ${set} incorrectly.`,
								type: MoveType.CALL_FAIL,
								turn: players
									.find(
										({ team, hand }) =>
											team !== mePlayer.team && hand.length !== 0
									)
									?._id.toHexString()
						  }
			}
		});
	}

	async declineCard({ gameId, cardDeclined }: DeclineCardInput, user: User) {
		let game = await this.getGameById(gameId);
		game = await this.updateGameById(gameId, {
			$set: {
				secondLastMove: game.lastMove,
				lastMove: game.currentMove,
				currentMove: {
					description: `${user.name} declined ${cardDeclined}. Now it's ${user.name}'s turn`,
					type: MoveType.DECLINED,
					turn: user._id.toHexString()
				}
			}
		});
		return game;
	}

	isGameCompleted(game: Game) {
		let flag = 0;
		game.players.forEach(({ hand }) => {
			if (hand.length !== 0) {
				flag = 1;
			}
		});

		return flag === 0;
	}

	async markAsCompleted(gameId: ObjectId | string) {
		const game = await this.updateGameById(gameId, {
			$set: { status: GameStatus.COMPLETED }
		});

		return game;
	}

	async giveCard({ cardToGive, gameId, giveTo }: GiveCardInput, user: User) {
		let { players, currentMove, lastMove } = await this.getGameById(gameId);
		let takingPlayer = players.find(({ _id }) => _id.equals(giveTo))!;
		takingPlayer.hand.push(cardToGive);

		let givingPlayer = players.find(({ _id }) => _id.equals(user._id))!;
		givingPlayer.hand = givingPlayer.hand.filter((card) => card !== cardToGive);

		players = players.map((player) => {
			if (player._id.equals(givingPlayer._id)) return givingPlayer;
			if (player._id.equals(takingPlayer?._id)) return takingPlayer;
			return player;
		});

		let game = await this.updateGameById(gameId, {
			$set: {
				players,
				secondLastMove: lastMove,
				lastMove: currentMove,
				currentMove: {
					type: MoveType.GIVEN,
					turn: giveTo,
					description: `${user.name} gave ${cardToGive} to ${takingPlayer.name}. Now it's ${takingPlayer.name}'s turn`
				}
			}
		});

		return game;
	}

	async askCard({ gameId, askedFor, askedFrom }: AskCardInput, user: User) {
		let { players, currentMove, lastMove } = await this.getGameById(gameId);
		const player = players.find(({ _id }) => _id.equals(askedFrom));

		let game = await this.updateGameById(gameId, {
			$set: {
				secondLastMove: lastMove,
				lastMove: currentMove,
				currentMove: {
					description: `${user.name} asked ${player?.name} for ${askedFor}`,
					type: MoveType.ASK,
					askedFor,
					askedBy: user._id.toHexString(),
					askedFrom
				}
			}
		});
		return game;
	}

	async transferChance(gameId: string, user: User) {
		let game = await this.getGameById(gameId);
		const myTeam: Player[] = [];
		const oppositeTeam: Player[] = [];
		const mePlayer = game.players.find(({ _id }) => _id.equals(user._id))!;

		game.players.forEach((player) => {
			if (player.hand.length !== 0) {
				if (player.team === mePlayer.team) myTeam.push(player);
				else oppositeTeam.push(player);
			}
		});

		if (myTeam.length === 0 && oppositeTeam.length === 0) {
			game = await this.markAsCompleted(game._id);
			return game;
		}

		const nextPlayer = myTeam.length === 0 ? oppositeTeam[0] : myTeam[0];

		game = await this.updateGameById(game._id, {
			$set: {
				secondLastMove: game.lastMove,
				lastMove: game.currentMove,
				currentMove: {
					type: MoveType.TURN,
					turn: nextPlayer._id.toHexString(),
					description: `${user.name} is left with no cards. Chance Transferred to ${nextPlayer.name}`
				}
			}
		});

		return game;
	}

	async updateGameById(_id: string | ObjectId, data: UpdateQuery<Game>) {
		if (typeof _id === "string") _id = new ObjectId(_id);

		const { modifiedCount } = await this.db
			.collection<Game>("games")
			.updateOne({ _id }, data)
			.catch((err) => {
				this.logger.error(err.message);
				throw new InternalServerErrorException();
			});

		if (modifiedCount !== 1) throw new InternalServerErrorException();
		return await this.getGameById(_id);
	}

	async getGameByCode(code: string) {
		const game = await this.db
			.collection<Game>("games")
			.findOne({ code })
			.catch((err) => {
				this.logger.error(err);
				throw new InternalServerErrorException();
			});

		if (!game) throw new NotFoundException("Game Not Found!");
		return game;
	}
}
