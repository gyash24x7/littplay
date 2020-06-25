import { UseGuards } from "@nestjs/common";
import { Mutation, Resolver } from "@nestjs/graphql";
import { AuthUser } from "../user/auth-user.decorator";
import { GqlAuthGuard } from "../user/gql-auth.guard";
import { User } from "../user/user.entity";
import { Game } from "./game.entity";
import { GameService } from "./game.service";

@Resolver(() => Game)
export class GameResolver {
	constructor(private readonly gameService: GameService) {}

	@Mutation(() => String)
	@UseGuards(GqlAuthGuard)
	async createGame(@AuthUser() user: User) {
		const game = await this.gameService.createGame(user);
		return game.gameCode;
	}
}
