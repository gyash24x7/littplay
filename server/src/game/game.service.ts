import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import cuid from "cuid";
import { Repository } from "typeorm";
import { User } from "../user/user.entity";
import { Game } from "./game.entity";
import { CreateTeamsInput } from "./game.inputs";

@Injectable()
export class GameService {
	constructor(
		@InjectRepository(Game) private readonly gameRepo: Repository<Game>
	) {}

	async createGame({ id: createdById }: User) {
		const gameCode = [...Array(6)]
			.map(() => (~~(Math.random() * 36)).toString(36))
			.join("")
			.toUpperCase();
		const id = cuid();
		return await this.gameRepo.save({ id, gameCode, createdById });
	}

	async joinGame(gameCode: string, user: User) {
		const game = await this.gameRepo.findOne({ gameCode });
		if (!game) throw new NotFoundException("Game Not Found!");

		game.players.push(user);
		await this.gameRepo.save(game);
	}

	async createTeams(data: CreateTeamsInput) {
		const game = await this.gameRepo.findOne(data.gameId);
		if (!game) throw new NotFoundException("Game Not Found!");
		game.teamAName = data.teamAName;
		game.teamBName = data.teamBName;
		game.teamAPlayers = data.teamAPlayers;
		game.teamBPlayers = data.teamBPlayers;
		await this.gameRepo.save(game);
	}

	async startGame(id: string) {}
}
