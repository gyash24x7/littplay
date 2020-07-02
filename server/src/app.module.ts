import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
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
			context: ({ req }) => ({ req }),
			playground: process.env.NODE_ENV === "development",
			introspection: process.env.NODE_ENV === "development"
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, "..", "..", "client", "build")
		}),
		UserModule,
		DatabaseModule,
		GameModule
	],
	providers: [GameService]
})
export class AppModule {}
