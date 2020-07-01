import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthUser } from "../user/auth-user.decorator";
import { GqlAuthGuard } from "../user/gql-auth.guard";
import { User } from "../user/user.type";
import { CreateTeamsInput } from "./game.inputs";
import { GameService } from "./game.service";
import { Game } from "./game.type";

@Resolver(() => Game)
export class GameResolver {
	constructor(private readonly gameService: GameService) {}

	@Mutation(() => String)
	@UseGuards(GqlAuthGuard)
	async createGame(@AuthUser() user: User) {
		return this.gameService.createGame(user);
	}

	@Query(() => Game)
	@UseGuards(GqlAuthGuard)
	async getGame(@Args("gameId") gameId: string) {
		return this.gameService.getGameById(gameId);
	}

	@Mutation(() => String)
	@UseGuards(GqlAuthGuard)
	async joinGame(@Args("code") code: string, @AuthUser() user: User) {
		return this.gameService.joinGame({ code, user });
	}

	@Mutation(() => Boolean)
	@UseGuards(GqlAuthGuard)
	async createTeams(@Args("data") data: CreateTeamsInput) {
		return this.gameService.createTeams(data);
	}

	@Mutation(() => Boolean)
	@UseGuards(GqlAuthGuard)
	async startGame(@Args("gameId") gameId: string) {
		return this.gameService.startGame(gameId);
	}
}
