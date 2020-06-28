import {
	Injectable,
	Logger,
	OnModuleDestroy,
	OnModuleInit
} from "@nestjs/common";
import { PrismaSelect } from "@paljs/plugins";
import { PrismaClient } from "@prisma/client";
import { GraphQLResolveInfo } from "graphql";

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

	getSelectFromInfo(info: GraphQLResolveInfo) {
		const select = new PrismaSelect(info);
		return select.value;
	}
}
