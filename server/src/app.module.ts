import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { DatabaseModule } from "./database/database.module";
import { GameModule } from "./game/game.module";
import { GameService } from "./game/game.service";
import { UserModule } from "./user/user.module";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		GraphQLModule.forRoot({
			autoSchemaFile: true,
			installSubscriptionHandlers: true,
			context: ({ req }) => ({ req })
		}),
		UserModule,
		DatabaseModule,
		GameModule
	],
	providers: [GameService]
})
export class AppModule {}
