import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GameActivityService } from "../game-activity/game-activity.service";
import { AuthUser } from "../user/auth-user.decorator";
import { GqlAuthGuard } from "../user/gql-auth.guard";
import { User } from "../user/user.entity";
import { GameActivityKind } from "../utils";
import { Game } from "./game.entity";
import { GameService } from "./game.service";
import { GameType } from "./game.type";

@Resolver(() => Game)
export class GameResolver {
	constructor(
		private readonly gameService: GameService,
		private readonly gameActivityService: GameActivityService
	) {}

	@Mutation(() => String)
	@UseGuards(GqlAuthGuard)
	async createGame(@AuthUser() user: User) {
		const game = await this.gameService.createGame(user);
		return game.gameCode;
	}

	@Mutation(() => GameType)
	@UseGuards(GqlAuthGuard)
	async joinGame(@Args("gameCode") gameCode: string, @AuthUser() user: User) {
		const game = await this.gameService.joinGame(gameCode, user);
		await this.gameActivityService.createActivity({
			game,
			kind: GameActivityKind.PLAYER_JOINED,
			description: `${user.name} joined the game`
		});
		return game;
	}

	@Query(() => GameType)
	@UseGuards(GqlAuthGuard)
	async getGame(@Args("gameCode") gameCode: string) {
		return this.gameService.getGame(gameCode);
	}
}
