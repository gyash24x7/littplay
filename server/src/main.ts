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

	let host =
		process.env.NODE_ENV !== "production" ? "192.168.43.59" : "localhost";

	app.use(helmet());
	const logger = new Logger("Bootstrap");
	app.enableCors({
		origin: [
			"http://192.168.43.59:3000",
			"http://192.168.43.59:8100",
			"http://localhost"
		],
		credentials: true
	});

	logger.log(process.env.NODE_ENV);

	await app.listen(8000, host);
}

bootstrap();
