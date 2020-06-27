import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import cuid from "cuid";
import { Repository } from "typeorm";
import { GameActivityService } from "../game-activity/game-activity.service";
import { GameToUserService } from "../game-to-user/game-to-user.service";
import { User } from "../user/user.entity";
import { GameActivityKind } from "../utils";
import { Deck } from "../utils/deck";
import { Game } from "./game.entity";
import { CreateTeamsInput } from "./game.inputs";

@Injectable()
export class GameService {
	constructor(
		@InjectRepository(Game) private readonly gameRepo: Repository<Game>,
		private readonly gameToUserService: GameToUserService,
		private readonly gameActivityService: GameActivityService
	) {}

	private readonly logger = new Logger("GameService");

	async createGame(user: User) {
		const game = await this.gameRepo.save({
			id: cuid(),
			gameCode: cuid.slug().toUpperCase(),
			createdById: user.id
		});
		this.logger.log(`Game Created: ${game.gameCode}`);

		await this.gameToUserService.createGameToUserRelation({
			gameId: game.id,
			userId: user.id
		});
		return game;
	}

	async joinGame(gameCode: string, user: User) {
		let game = await this.gameRepo.findOne({ gameCode });
		if (!game) throw new NotFoundException("Game Not Found!");

		if (!this.gameToUserRelationExists(game, user)) {
			await this.gameToUserService.createGameToUserRelation({
				gameId: game.id,
				userId: user.id
			});

			game = await this.gameRepo.findOne({ gameCode });

			if (game) {
				await this.gameActivityService.createActivity({
					game,
					kind: GameActivityKind.PLAYER_JOINED,
					description: `${user.name} joined the game`
				});
			}
		}

		return game!;
	}

	async createTeams({ teamA, teamB, gameId }: CreateTeamsInput, user: User) {
		let game = await this.gameRepo.findOne(gameId);
		if (!game) throw new NotFoundException("Game Not Found!");
		game.teamA = teamA;
		game.teamB = teamB;
		game = await this.gameRepo.save(game);
		this.logger.log(
			`Teams Created for the Game: ${game.gameCode}, ${teamA}, ${teamB}`
		);

		game.gameToUsers = await this.gameToUserService.addTeamsToGameToUserRelations(
			game.gameToUsers,
			[teamA, teamB]
		);

		await this.gameActivityService.createActivity({
			game,
			kind: GameActivityKind.TEAMS_CREATED,
			description: `${user.name} created the teams`
		});

		return game;
	}

	async startGame(id: string) {
		let game: any = await this.gameRepo.findOne(id);
		if (!game) throw new NotFoundException("Game Not Found!");

		const deck = new Deck();
		deck.removeCardsOfRank("SEVEN");
		deck.shuffle();
		deck.generateHands(6).map((hand, i) => {
			game[`a${i}`] = hand.map((card) => card.getCardString());
		});

		game = await this.gameRepo.save(game);
		this.logger.log(`Generated Hands for the Game: ${game.gameCode}`);
	}

	async getGame(gameId: string) {
		const game = await this.gameRepo.findOne(gameId);
		if (!game) throw new NotFoundException("Game Not Found!");
		return game;
	}

	gameToUserRelationExists(game: Game, user: User) {
		const relation = game.gameToUsers.find(({ userId }) => user.id === userId);
		return !!relation;
	}
}
