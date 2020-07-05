import { Inject, UseGuards, ValidationPipe } from "@nestjs/common";
import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { PubSub } from "apollo-server-fastify";
import { AuthUser } from "../user/auth-user.decorator";
import { GqlAuthGuard } from "../user/gql-auth.guard";
import { User } from "../user/user.type";
import {
	AskCardInput,
	CallSetInput,
	CreateTeamsInput,
	DeclineCardInput,
	GiveCardInput
} from "./game.inputs";
import { GameService } from "./game.service";
import { Game } from "./game.type";

@Resolver(() => Game)
export class GameResolver {
	constructor(
		private readonly gameService: GameService,
		@Inject("PubSub") private readonly pubsub: PubSub
	) {}

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
		const game = await this.gameService.joinGame(code, user);
		await this.pubsub.publish(game._id.toHexString(), game);
		return game._id.toHexString();
	}

	@Mutation(() => Boolean)
	@UseGuards(GqlAuthGuard)
	async createTeams(@Args("data", ValidationPipe) data: CreateTeamsInput) {
		const game = await this.gameService.createTeams(data);
		await this.pubsub.publish(game._id.toHexString(), game);
		return true;
	}

	@Mutation(() => Boolean)
	@UseGuards(GqlAuthGuard)
	async startGame(@Args("gameId") gameId: string) {
		const game = await this.gameService.startGame(gameId);
		await this.pubsub.publish(game._id.toHexString(), game);
		return true;
	}

	@Mutation(() => Boolean)
	@UseGuards(GqlAuthGuard)
	async askCard(
		@Args("data", ValidationPipe) data: AskCardInput,
		@AuthUser() user: User
	) {
		const game = await this.gameService.askCard(data, user);
		await this.pubsub.publish(game._id.toHexString(), game);
		return true;
	}

	@Mutation(() => Boolean)
	@UseGuards(GqlAuthGuard)
	async giveCard(
		@Args("data", ValidationPipe) data: GiveCardInput,
		@AuthUser() user: User
	) {
		const game = await this.gameService.giveCard(data, user);
		await this.pubsub.publish(game._id.toHexString(), game);
		return true;
	}

	@Mutation(() => Boolean)
	@UseGuards(GqlAuthGuard)
	async declineCard(
		@Args("data", ValidationPipe) data: DeclineCardInput,
		@AuthUser() user: User
	) {
		const game = await this.gameService.declineCard(data, user);
		await this.pubsub.publish(game._id.toHexString(), game);
		return true;
	}

	@Mutation(() => Boolean)
	@UseGuards(GqlAuthGuard)
	async callSet(
		@Args("data", ValidationPipe) data: CallSetInput,
		@AuthUser() user: User
	) {
		let game = await this.gameService.callSet(data, user);
		if (this.gameService.isGameCompleted(game)) {
			game = await this.gameService.markAsCompleted(game._id);
		}
		await this.pubsub.publish(data.gameId, game);
		return true;
	}

	@Mutation(() => Boolean)
	@UseGuards(GqlAuthGuard)
	async transferChance(@Args("gameId") gameId: string, @AuthUser() user: User) {
		const game = await this.gameService.transferChance(gameId, user);
		await this.pubsub.publish(gameId, game);
		return true;
	}

	@Subscription(() => Game, { resolve: (value) => value })
	async game(@Args("gameId") gameId: string) {
		return this.pubsub.asyncIterator(gameId);
	}
}
