import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PubSub } from "apollo-server-fastify";
import { GameActivity } from "./game-activity.entity";
import { GameActivityResolver } from "./game-activity.resolver";
import { GameActivityService } from "./game-activity.service";

@Module({
	providers: [
		GameActivityService,
		GameActivityResolver,
		{ provide: "PubSub", useValue: new PubSub() }
	],
	imports: [TypeOrmModule.forFeature([GameActivity])],
	exports: [GameActivityService, TypeOrmModule]
})
export class GameActivityModule {}
