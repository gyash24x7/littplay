import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { GameResolver } from "./game.resolver";
import { GameService } from "./game.service";

@Module({
	providers: [GameResolver, GameService],
	imports: [PrismaModule]
})
export class GameModule {}
