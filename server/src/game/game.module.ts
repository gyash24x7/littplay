import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { GameResolver } from "./game.resolver";

@Module({ providers: [GameResolver], imports: [PrismaModule] })
export class GameModule {}
