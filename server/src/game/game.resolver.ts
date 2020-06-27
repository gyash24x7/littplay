import { UseGuards } from "@nestjs/common";
import {
	Args,
	Mutation,
	Parent,
	Query,
	ResolveField,
	Resolver
} from "@nestjs/graphql";
import { GameToUserType } from "../game-to-user/game-to-user.type";
import { AuthUser } from "../user/auth-user.decorator";
import { GqlAuthGuard } from "../user/gql-auth.guard";
import { User } from "../user/user.entity";
import { UserType } from "../user/user.type";
import { Game } from "./game.entity";
import { CreateTeamsInput } from "./game.inputs";
import { GameService } from "./game.service";
import { GameType } from "./game.type";

@Resolver(() => GameType)
export class GameResolver {
	constructor(private readonly gameService: GameService) {}

	@Mutation(() => GameType)
	@UseGuards(GqlAuthGuard)
	async createGame(@AuthUser() user: User) {
		const game = await this.gameService.createGame(user);
		return game;
	}

	@Mutation(() => GameType)
	@UseGuards(GqlAuthGuard)
	async joinGame(@Args("gameCode") gameCode: string, @AuthUser() user: User) {
		const game = await this.gameService.joinGame(gameCode, user);
		return game;
	}

	@Query(() => GameType)
	@UseGuards(GqlAuthGuard)
	async getGame(@Args("gameId") gameId: string) {
		return this.gameService.getGame(gameId);
	}

	@Mutation(() => GameType)
	@UseGuards(GqlAuthGuard)
	async createTeams(
		@Args("data") data: CreateTeamsInput,
		@AuthUser() user: User
	) {
		const game = await this.gameService.createTeams(data, user);
		return game;
	}

	@ResolveField(() => [GameToUserType])
	teamAMembers(@Parent() game: Game) {
		if (game.teamA)
			return game.gameToUsers
				.filter((gameToUser) => gameToUser.team === game.teamA)
				.map<GameToUserType>(({ user, hand }) => ({ user, hand }));
		else return [];
	}

	@ResolveField(() => [GameToUserType])
	teamBMembers(@Parent() game: Game) {
		if (game.teamB)
			return game.gameToUsers
				.filter((gameToUser) => gameToUser.team === game.teamB)
				.map<GameToUserType>(({ user, hand }) => ({ user, hand }));
		return [];
	}

	@ResolveField(() => [UserType])
	players(@Parent() game: Game) {
		return game.gameToUsers?.map((gameToUser) => gameToUser.user) || [];
	}
}
