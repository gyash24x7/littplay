import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PubSub } from "apollo-server-fastify";
import { GameActivityModule } from "../game-activity/game-activity.module";
import { GameToUserModule } from "../game-to-user/game-to-user.module";
import { UserModule } from "../user/user.module";
import { Game } from "./game.entity";
import { GameResolver } from "./game.resolver";
import { GameService } from "./game.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([Game]),
		UserModule,
		GameActivityModule,
		GameToUserModule
	],
	providers: [
		GameService,
		GameResolver,
		{ provide: "PubSub", useValue: new PubSub() }
	]
})
export class GameModule {}
