import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DatabaseFactory } from "./database.factory";

@Global()
@Module({
	providers: [
		{
			provide: "Database",
			useFactory: DatabaseFactory,
			inject: [ConfigService]
		}
	],
	exports: ["Database"]
})
export class DatabaseModule {}
