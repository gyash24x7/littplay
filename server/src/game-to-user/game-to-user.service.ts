import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import cuid from "cuid";
import { Repository } from "typeorm";
import { GameToUser } from "./game-to-user.entity";
import { CreateGameToUserInput } from "./game-to-user.inputs";

@Injectable()
export class GameToUserService {
	constructor(
		@InjectRepository(GameToUser)
		private readonly gameToUserRepo: Repository<GameToUser>
	) {}

	private readonly logger = new Logger("GameToUserService");

	async createGameToUserRelation({ gameId, userId }: CreateGameToUserInput) {
		const id = cuid();
		const gameToUser = await this.gameToUserRepo.save({ id, gameId, userId });
		this.logger.log(`GameToUser Entry Created for: ${userId}, ${gameId}`);
		return gameToUser;
	}

	async addTeamsToGameToUserRelations(
		gameToUsers: GameToUser[],
		teams: string[]
	) {
		gameToUsers = await Promise.all(
			gameToUsers.map((gameToUser, i) => {
				if (i < 3) gameToUser.team = teams[0];
				else gameToUser.team = teams[1];
				return this.gameToUserRepo.save(gameToUser);
			})
		);
		this.logger.log("Added Teams to GameToUser Relations");
		return gameToUsers;
	}
}
