import { UseGuards, ValidationPipe } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "@prisma/client";
import { AuthUser } from "../user/auth-user.decorator";
import { GqlAuthGuard } from "../user/gql-auth.guard";
import { CreateTeamsInput } from "./game.inputs";
import { GameService } from "./game.service";
import { GameType } from "./game.type";

@Resolver(() => GameType)
export class GameResolver {
	constructor(private readonly gameService: GameService) {}

	@Mutation(() => String)
	@UseGuards(GqlAuthGuard)
	async createGame(@AuthUser() { id }: User) {
		const game = await this.gameService.createGame(id);
		return game.id;
	}

	@Mutation(() => String)
	@UseGuards(GqlAuthGuard)
	async joinGame(@Args("code") code: string, @AuthUser() { id }: User) {
		const game = await this.gameService.joinGame(code, id);
		return game.id;
	}

	@Mutation(() => Boolean)
	@UseGuards(GqlAuthGuard)
	async createTeams(@Args("data", ValidationPipe) data: CreateTeamsInput) {
		const game = await this.gameService.createTeams(data);
		return !!game;
	}

	@Query(() => GameType)
	@UseGuards(GqlAuthGuard)
	async getGame(@Args("gameId") gameId: string) {
		return this.gameService.getGame(gameId);
	}
}
