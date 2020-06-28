import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";
import { GameModule } from "./game/game.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";

@Module({
	imports: [
		ConfigModule.forRoot({ envFilePath: "../prisma/.env" }),
		GraphQLModule.forRoot({
			typePaths: [join(process.cwd(), "src/graphql/schema.graphql")],
			installSubscriptionHandlers: true,
			context: ({ req }) => ({ req })
		}),
		UserModule,
		GameModule,
		PrismaModule
	]
})
export class AppModule {}
