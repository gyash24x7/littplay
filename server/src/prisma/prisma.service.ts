import {
	Injectable,
	Logger,
	OnModuleDestroy,
	OnModuleInit
} from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient
	implements OnModuleInit, OnModuleDestroy {
	constructor() {
		super({
			log: ["query", "error", "info", "warn"],
			datasources: { db: { url: process.env.DATABASE_URL } }
		});
	}

	private readonly logger = new Logger("PrismaService");

	async onModuleInit() {
		await this.connect();
		this.logger.log("Connected To DB!");
	}

	async onModuleDestroy() {
		await this.disconnect();
		this.logger.log("Disconnected from DB!");
	}
}
