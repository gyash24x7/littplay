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
import { CreateTeamsInput, JoinGameDto } from "./game.inputs";
import { Game, GameStatus } from "./game.type";

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
		const game = await this.getGameByCode(code);

		if (game.players.length === game.playerCount) {
			throw new BadRequestException("Game Capacity Full!");
		}

		if (!game.players.find(({ _id }) => user._id === _id)) {
			const players = game.players.concat({ ...user, hand: [], team: "" });
			let updateQuery: UpdateQuery<Game> = { $set: { players } };

			if (players.length === game.playerCount)
				updateQuery = { $set: { players, status: GameStatus.PLAYERS_READY } };

			await this.updateGameById(game._id, updateQuery);
		}

		return game._id;
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

		await this.updateGameById(_id, {
			$set: { teams, players, status: GameStatus.TEAMS_CREATED }
		});
		return true;
	}

	async startGame(gameId: string) {
		let { playerCount, players, status, _id } = await this.getGameById(gameId);
		if (status !== GameStatus.TEAMS_CREATED)
			throw new BadRequestException("Teams Not Created!");

		const deck = new Deck();
		deck
			.removeCardsOfRank("SEVEN")
			.generateHands(playerCount)
			.map(Deck.sortHand)
			.forEach((hand, i) => {
				players[i].hand = hand.map((card) => card.getCardString());
			});

		await this.updateGameById(_id, {
			$set: { players, status: GameStatus.IN_PROGRESS }
		});

		return true;
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
