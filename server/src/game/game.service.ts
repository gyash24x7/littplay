import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import cuid from "cuid";
import { PrismaService } from "../prisma/prisma.service";
import { CreateTeamsInput } from "./game.inputs";

@Injectable()
export class GameService {
	private readonly logger = new Logger("GameService");
	constructor(private readonly prisma: PrismaService) {}

	async createGame(userId: string) {
		const game = await this.prisma.game.create({
			data: {
				code: cuid.slug().toUpperCase(),
				players: { connect: { id: userId } }
			}
		});

		this.logger.log(`New Game Created: ${game.code}`);
		return game;
	}

	async joinGame(code: string, userId: string) {
		const game = await this.prisma.game.update({
			where: { code },
			data: { players: { connect: { id: userId } } }
		});

		this.logger.log(`New Player Joined: ${game.code}, ${userId}`);
		return game;
	}

	async createTeams({ gameId, teamA, teamB }: CreateTeamsInput) {
		const game = await this.prisma.game.findOne({
			where: { id: gameId },
			select: { players: { select: { id: true } }, id: true }
		});

		if (!game) throw new NotFoundException("Game Not Found!");
		const [teamAMembers, teamBMembers] = splitArray(
			shuffle(game.players.map(({ id }) => id))
		);

		let gameWithTeams = await this.prisma.game.update({
			where: { id: game.id },
			data: {
				teams: {
					create: [
						{
							name: teamA,
							members: { connect: teamAMembers.map((id) => ({ id })) }
						},
						{
							name: teamB,
							members: { connect: teamBMembers.map((id) => ({ id })) }
						}
					]
				}
			}
		});

		return gameWithTeams;
	}

	async getGame(id: string) {
		const game = await this.prisma.game.findOne({ where: { id } });
		if (!game) throw new NotFoundException("Game Not Found!");
		return game;
	}
}

function shuffle<T>(array: T[]) {
	let arr = [...array];
	for (let i = arr.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

function splitArray<T>(arr: T[]) {
	return [arr.slice(0, arr.length / 2), arr.slice(arr.length / 2)];
}
