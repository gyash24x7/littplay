import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AvatarModule } from "./avatar/avatar.module";
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
			context: ({ request }) => ({ req: request }),
			playground: process.env.NODE_ENV !== "production",
			introspection: process.env.NODE_ENV !== "production"
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, "..", "..", "client", "build")
		}),
		UserModule,
		DatabaseModule,
		GameModule,
		AvatarModule
	],
	providers: [GameService]
})
export class AppModule {}
