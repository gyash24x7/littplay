import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { GameActivityModule } from "./game-activity/game-activity.module";
import { GameModule } from "./game/game.module";
import { TeamModule } from "./team/team.module";
import { UserModule } from "./user/user.module";

@Module({
	imports: [
		GraphQLModule.forRoot({
			autoSchemaFile: true,
			installSubscriptionHandlers: true,
			context: ({ req }) => ({ req })
		}),
		UserModule,
		GameModule,
		TeamModule,
		GameActivityModule
	]
})
export class AppModule {}
