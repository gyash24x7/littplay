import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
	FastifyAdapter,
	NestFastifyApplication
} from "@nestjs/platform-fastify";
import helmet from "helmet";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter()
	);

	let host = "localhost";

	app.use(helmet());
	const logger = new Logger("Bootstrap");
	if (process.env.NODE_ENV !== "production") {
		app.enableCors({ origin: "http://192.168.43.59:3000", credentials: true });
		host = "192.168.43.59";
	}
	logger.log(process.env.NODE_ENV);

	await app.listen(8000, host);
}

bootstrap();
