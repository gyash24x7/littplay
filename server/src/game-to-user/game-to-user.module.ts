import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GameToUser } from "./game-to-user.entity";
import { GameToUserResolver } from "./game-to-user.resolver";
import { GameToUserService } from "./game-to-user.service";

@Module({
	providers: [GameToUserService, GameToUserResolver],
	imports: [TypeOrmModule.forFeature([GameToUser])],
	exports: [GameToUserService, TypeOrmModule]
})
export class GameToUserModule {}
