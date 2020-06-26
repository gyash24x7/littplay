import { Inject } from "@nestjs/common";
import { Args, Resolver, Subscription } from "@nestjs/graphql";
import { PubSubEngine } from "apollo-server-fastify";
import { GameActivityType } from "./game-activity.type";

@Resolver(() => GameActivityType)
export class GameActivityResolver {
	constructor(@Inject("PubSub") private readonly pubsub: PubSubEngine) {}

	@Subscription(() => GameActivityType, {
		resolve: (value) => value
	})
	async gameActivity(@Args("gameCode") gameCode: string) {
		return this.pubsub.asyncIterator(gameCode);
	}
}
