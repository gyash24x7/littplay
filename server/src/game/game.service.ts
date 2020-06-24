import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import cuid from "cuid";
import { Repository } from "typeorm";
import { User } from "../user/user.entity";
import { Deck } from "../utils/deck";
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
		game.teamA = data.teamA;
		game.teamB = data.teamB;
		await this.gameRepo.save(game);
	}

	async startGame(id: string) {
		const game = await this.gameRepo.findOne(id);
		if (!game) throw new NotFoundException("Game Not Found!");

		const deck = new Deck();
		deck.removeCardsOfRank("SEVEN");
		deck.shuffle();
		const hands = deck.generateHands(6);
		game.a0 = hands[0].map((card) => card.getCardString());
		game.a1 = hands[1].map((card) => card.getCardString());
		game.a2 = hands[2].map((card) => card.getCardString());
		game.b0 = hands[3].map((card) => card.getCardString());
		game.b1 = hands[4].map((card) => card.getCardString());
		game.b2 = hands[5].map((card) => card.getCardString());

		await this.gameRepo.save(game);
	}
}
