import { Module } from "@nestjs/common";
import { PubSub } from "apollo-server-fastify";
import { PrismaModule } from "../prisma/prisma.module";
import { GameResolver } from "./game.resolver";

@Module({
	providers: [GameResolver, { provide: "PubSub", useValue: new PubSub() }],
	imports: [PrismaModule]
})
export class GameModule {}
