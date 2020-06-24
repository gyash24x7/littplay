import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user/user.module";
import { Game } from "./game.entity";
import { GameResolver } from "./game.resolver";
import { GameService } from "./game.service";

@Module({
	imports: [TypeOrmModule.forFeature([Game]), UserModule],
	providers: [GameService, GameResolver]
})
export class GameModule {}
