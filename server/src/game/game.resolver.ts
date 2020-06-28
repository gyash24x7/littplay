import {
	Logger,
	NotFoundException,
	UseGuards,
	ValidationPipe
} from "@nestjs/common";
import { Args, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "@prisma/client";
import cuid from "cuid";
import { GraphQLResolveInfo } from "graphql";
import { PrismaService } from "../prisma/prisma.service";
import { AuthUser } from "../user/auth-user.decorator";
import { GqlAuthGuard } from "../user/gql-auth.guard";
import { shuffle, splitArray } from "../utils";
import { CreateTeamsInput } from "./game.inputs";
import { GameType } from "./game.type";

@Resolver(() => GameType)
export class GameResolver {
	constructor(private readonly prisma: PrismaService) {}
	private readonly logger = new Logger("GameResolver");

	@Mutation(() => String)
	@UseGuards(GqlAuthGuard)
	async createGame(@AuthUser() { id }: User) {
		const game = await this.prisma.game.create({
			data: { code: cuid.slug().toUpperCase(), players: { connect: { id } } }
		});

		this.logger.log(`New Game Created: ${game.code}`);
		return game.id;
	}

	@Mutation(() => String)
	@UseGuards(GqlAuthGuard)
	async joinGame(@Args("code") code: string, @AuthUser() { id }: User) {
		const game = await this.prisma.game.update({
			where: { code },
			data: { players: { connect: { id } } }
		});

		this.logger.log(`New Player Joined: ${game.code}, ${id}`);
		return game.id;
	}

	@Mutation(() => Boolean)
	@UseGuards(GqlAuthGuard)
	async createTeams(@Args("data", ValidationPipe) data: CreateTeamsInput) {
		const game = await this.prisma.game.findOne({
			where: { id: data.gameId },
			select: { players: { select: { id: true } }, id: true }
		});

		if (!game) throw new NotFoundException("Game Not Found!");

		const [teamA, teamB] = splitArray(shuffle(game.players)).map((ids, i) => ({
			name: data.teams[i],
			members: { connect: ids }
		}));

		let gameWithTeams = await this.prisma.game.update({
			where: { id: game.id },
			data: { teams: { create: [teamA, teamB] } }
		});

		return !!gameWithTeams;
	}

	@Query(() => GameType)
	@UseGuards(GqlAuthGuard)
	async getGame(
		@Args("gameId") gameId: string,
		@Info() info: GraphQLResolveInfo
	) {
		const { select } = this.prisma.getSelectFromInfo(info);
		const game = await this.prisma.game.findOne({
			where: { id: gameId },
			select
		});
		if (!game) throw new NotFoundException("Game Not Found!");
		return game;
	}
}
