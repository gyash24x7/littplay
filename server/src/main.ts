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
	app.use(helmet());
	app.enableCors({ origin: "http://localhost:3000", credentials: true });
	await app.listen(8000);
}
bootstrap();
