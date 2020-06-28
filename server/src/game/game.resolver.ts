import { Logger, NotFoundException, UseGuards } from "@nestjs/common";
import { Args, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "@prisma/client";
import cuid from "cuid";
import { GraphQLResolveInfo } from "graphql";
import { CreateTeamsInput } from "../graphql/generated";
import { PrismaService } from "../prisma/prisma.service";
import { AuthUser } from "../user/auth-user.decorator";
import { GqlAuthGuard } from "../user/gql-auth.guard";
import { shuffle, splitArray } from "../utils";

@Resolver("Game")
export class GameResolver {
	constructor(private readonly prisma: PrismaService) {}
	private readonly logger = new Logger("GameResolver");

	@Mutation()
	@UseGuards(GqlAuthGuard)
	async createGame(@AuthUser() { id }: User) {
		const game = await this.prisma.game.create({
			data: {
				code: cuid.slug().toUpperCase(),
				players: { create: { user: { connect: { id } } } }
			}
		});

		this.logger.log(`New Game Created: ${game.code}`);
		return game.id;
	}

	@Mutation()
	@UseGuards(GqlAuthGuard)
	async joinGame(@Args("code") code: string, @AuthUser() { id }: User) {
		let game = await this.prisma.game.findOne({
			where: { code },
			include: { players: true }
		});

		if (!game) throw new NotFoundException("Game Not Found!");

		if (game.playerCount === game.players.length)
			throw new Error("This Game already has 6 players!");

		game = await this.prisma.game.update({
			where: { code },
			data: { players: { create: { user: { connect: { id } } } } },
			include: { players: true }
		});

		this.logger.log(`New Player Joined: ${game.code}, ${id}`);
		return game.id;
	}

	@Mutation()
	@UseGuards(GqlAuthGuard)
	async createTeams(@Args("data") data: CreateTeamsInput) {
		const game = await this.prisma.game.findOne({
			where: { id: data.gameId },
			select: { players: { select: { id: true } }, id: true }
		});

		if (!game) throw new NotFoundException("Game Not Found!");

		await Promise.all(
			splitArray(shuffle(game.players).map(({ id }) => id)).map(
				(playerIds, i) => {
					return this.prisma.player.updateMany({
						where: { id: { in: playerIds } },
						data: { team: data.teams[i] }
					});
				}
			)
		);

		let updatedGame = await this.prisma.game.update({
			where: { id: game.id },
			data: { teams: { set: data.teams } }
		});

		return !!updatedGame;
	}

	@Query()
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
