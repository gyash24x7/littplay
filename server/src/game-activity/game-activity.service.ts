import { Injectable } from "@nestjs/common";
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

	async createActivity(data: CreateGameActivityInput) {
		return this.gameActivityRepo.save({ id: cuid(), ...data });
	}
}
