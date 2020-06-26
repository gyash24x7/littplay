import { UseGuards } from "@nestjs/common";
import {
	Args,
	Mutation,
	Parent,
	Query,
	ResolveField,
	Resolver
} from "@nestjs/graphql";
import { GameActivityService } from "../game-activity/game-activity.service";
import { GameToUserType } from "../game-to-user/game-to-user.type";
import { AuthUser } from "../user/auth-user.decorator";
import { GqlAuthGuard } from "../user/gql-auth.guard";
import { User } from "../user/user.entity";
import { GameActivityKind } from "../utils";
import { Game } from "./game.entity";
import { CreateTeamsInput } from "./game.inputs";
import { GameService } from "./game.service";
import { GameType } from "./game.type";

@Resolver(() => GameType)
export class GameResolver {
	constructor(
		private readonly gameService: GameService,
		private readonly gameActivityService: GameActivityService
	) {}

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

	@Mutation(() => GameType)
	@UseGuards(GqlAuthGuard)
	async createTeams(
		@Args("data") data: CreateTeamsInput,
		@AuthUser() user: User
	) {
		const game = await this.gameService.createTeams(data);
		await this.gameActivityService.createActivity({
			game,
			kind: GameActivityKind.TEAMS_CREATED,
			description: `${user.name} created the teams`
		});
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
}
