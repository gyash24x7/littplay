import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import cuid from "cuid";
import { Repository } from "typeorm";
import { GameActivity } from "./game-activity.entity";
import { CreateGameActivityInput } from "./game-activity.inputs";

@Injectable()
export class GameActivityService {
	constructor(
		@InjectRepository(GameActivity)
		private readonly gameActivityRepo: Repository<GameActivity>
	) {}

	private readonly logger = new Logger("GameActivityService");

	async createActivity(data: CreateGameActivityInput) {
		const activity = await this.gameActivityRepo.save({ id: cuid(), ...data });
		this.logger.log(
			`GameActivity created: ${activity.kind}, ${activity.game.gameCode}`
		);
		return activity;
	}
}
