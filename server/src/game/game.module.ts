import { Module } from "@nestjs/common";
import { PubSub } from "apollo-server-fastify";
import { GameResolver } from "./game.resolver";
import { GameService } from "./game.service";

@Module({
	providers: [
		GameService,
		GameResolver,
		{ provide: "PubSub", useValue: new PubSub() }
	]
})
export class GameModule {}
