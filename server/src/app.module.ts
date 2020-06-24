import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GameModule } from "./game/game.module";
import { UserModule } from "./user/user.module";

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "postgres",
			url: "postgresql://gyuapstha:xdcVy2Ue@localhost:5432/littplay",
			autoLoadEntities: true,
			logging: true,
			synchronize: true
		}),
		GraphQLModule.forRoot({
			autoSchemaFile: true,
			installSubscriptionHandlers: true,
			context: ({ req }) => ({ req })
		}),
		GameModule,
		UserModule
	],
	controllers: []
})
export class AppModule {}