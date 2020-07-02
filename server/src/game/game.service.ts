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
import { Deck } from "../utils/deck";
import {
	AskCardInput,
	CreateTeamsInput,
	DeclineCardInput,
	GiveCardInput,
	JoinGameDto
} from "./game.inputs";
import { Game, GameStatus, MoveType } from "./game.type";

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

	async joinGame({ code, user }: JoinGameDto) {
		let game = await this.getGameByCode(code);

		if (
			!game.players.find(
				({ _id }) => user._id.toHexString() === _id.toHexString()
			)
		) {
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

		players = teams.flatMap((team, i) =>
			players
				.slice((i * playerCount) / 2, ((i + 1) * playerCount) / 2)
				.map((player) => ({ ...player, team }))
		);

		const game = await this.updateGameById(_id, {
			$set: { teams, players, status: GameStatus.TEAMS_CREATED }
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

	// async callSet({ callData, gameId }: CallSetInput, user: User) {
	// 	let { players, currentMove } = await this.getGameById(gameId);
	// 	const callSetData: Record<string, string[]> = JSON.parse(callData);

	// 	for (const userId in callSetData) {
	// 		if (callSetData.hasOwnProperty(userId)) {
	// 			const cards = callSetData[userId];
	// 			const player = players.find(({ _id }) => _id.toHexString() === userId)!;
	// 			player.hand.filter;
	// 		}
	// 	}
	// }

	async declineCard({ gameId, cardDeclined }: DeclineCardInput, user: User) {
		let game = await this.getGameById(gameId);
		game = await this.updateGameById(gameId, {
			$set: {
				lastMove: game.currentMove,
				currentMove: {
					description: `${user.name} declined ${cardDeclined}. Now it's ${user.name}'s turn`,
					type: MoveType.TURN,
					turn: user._id.toHexString()
				}
			}
		});
		return game;
	}

	async giveCard({ cardToGive, gameId, giveTo }: GiveCardInput, user: User) {
		let { players, currentMove } = await this.getGameById(gameId);
		let takingPlayer = players.find(({ _id }) => _id.toHexString() === giveTo)!;
		takingPlayer.hand.push(cardToGive);

		let givingPlayer = players.find(({ _id }) => _id === user._id)!;
		givingPlayer.hand = givingPlayer.hand.filter((card) => card !== cardToGive);

		players = players.map((player) => {
			if (player._id === givingPlayer._id) return givingPlayer;
			if (player._id === takingPlayer?._id) return takingPlayer;
			return player;
		});

		let game = await this.updateGameById(gameId, {
			$set: {
				players,
				lastMove: currentMove,
				currentMove: {
					type: MoveType.TURN,
					turn: giveTo,
					description: `${user.name} gave ${cardToGive} to ${takingPlayer.name}. Now it's ${takingPlayer.name}'s turn`
				}
			}
		});

		return game;
	}

	async askCard({ gameId, askedFor, askedFrom }: AskCardInput, user: User) {
		let { players, currentMove } = await this.getGameById(gameId);
		const player = players.find(({ _id }) => _id.toHexString() === askedFrom);

		let game = await this.updateGameById(gameId, {
			$set: {
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
