import { Inject, Logger } from "@nestjs/common";
import { PubSubEngine } from "apollo-server-fastify";
import {
	Connection,
	EntitySubscriberInterface,
	EventSubscriber,
	InsertEvent
} from "typeorm";
import { GameActivity } from "./game-activity.entity";

@EventSubscriber()
export class GameActivitySubscriber
	implements EntitySubscriberInterface<GameActivity> {
	constructor(
		@Inject("PubSub") private readonly pubsub: PubSubEngine,
		connection: Connection
	) {
		connection.subscribers.push(this);
	}

	private logger = new Logger("GameActivitySubscriber");

	listenTo() {
		return GameActivity;
	}

	async afterInsert({ entity }: InsertEvent<GameActivity>) {
		this.pubsub.publish(entity.game.gameCode, entity).then(() => {
			this.logger.log(`GameActivity Published to: ${entity.game.gameCode}`);
		});
	}
}
