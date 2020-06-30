import {
	BadRequestException,
	Inject,
	Injectable,
	InternalServerErrorException,
	Logger,
	NotFoundException
} from "@nestjs/common";
import cuid from "cuid";
import { Db, ObjectID, UpdateQuery } from "mongodb";
import { User } from "../user/user.type";
import { CreateTeamsInput, JoinGameDto } from "./game.inputs";
import { Game } from "./game.type";

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
				status: "NOT_STARTED",
				teams: []
			})
			.catch((err) => {
				this.logger.error(err);
				throw new InternalServerErrorException();
			});

		this.logger.log(`Game created: ${insertedId}`);
		return insertedId;
	}

	async getGameById(_id: string) {
		const game = await this.db
			.collection<Game>("games")
			.findOne({ _id: new ObjectID(_id) })
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
			await this.updateGameById(game._id, { $set: { players } });
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
			players.slice(i * 3, (i + 1) * 3).map((player) => ({ ...player, team }))
		);

		await this.updateGameById(_id, { $set: { teams, players } });
		return true;
	}

	async updateGameById(_id: ObjectID, data: UpdateQuery<Game>) {
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
