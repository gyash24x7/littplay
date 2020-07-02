import { InternalServerErrorException, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongoClient } from "mongodb";

export const DatabaseFactory = async (configService: ConfigService) => {
	const logger = new Logger("DatabaseProviderFactory");

	const client = await MongoClient.connect(
		configService.get<string>("DATABASE_URL")!,
		{ useNewUrlParser: true, useUnifiedTopology: true }
	).catch((err) => {
		logger.error(err);
		throw new InternalServerErrorException("Unable to connect to DB!");
	});

	return client.db("literature");
};
