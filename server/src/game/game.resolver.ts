import {
	BadRequestException,
	InternalServerErrorException,
	Logger,
	NotFoundException,
	UseGuards
} from "@nestjs/common";
import { Args, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Game, User } from "@prisma/client";
import cuid from "cuid";
import { GraphQLResolveInfo } from "graphql";
import { CreateTeamsInput } from "../graphql/generated";
import { validateCreateTeamsInput } from "../graphql/validateInputs";
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
		let game: Game | undefined;
		try {
			game = await this.prisma.game.create({
				data: {
					code: cuid.slug().toUpperCase(),
					players: { create: { user: { connect: { id } } } },
					createdBy: { connect: { id } }
				}
			});
		} catch (error) {
			throw new InternalServerErrorException(error);
		}

		this.logger.log(`New Game Created: ${game.code}`);
		return game!.id;
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
			throw new BadRequestException("This Game already has 6 players!");

		if (game.players.map((player) => player.id).includes(id)) {
			return game.id;
		}

		try {
			game = await this.prisma.game.update({
				where: { code },
				data: { players: { create: { user: { connect: { id } } } } },
				include: { players: true }
			});
		} catch (error) {
			this.logger.error(error.message);
			throw new InternalServerErrorException(error);
		}

		this.logger.log(`New Player Joined: ${game.code}, ${id}`);
		return game.id;
	}

	@Mutation()
	@UseGuards(GqlAuthGuard)
	async createTeams(@Args("data") data: CreateTeamsInput) {
		const errorMsg = validateCreateTeamsInput(data);
		if (errorMsg) throw new BadRequestException(errorMsg);

		const game = await this.prisma.game.findOne({
			where: { id: data.gameId },
			select: { players: { select: { id: true } }, id: true }
		});

		if (!game) throw new NotFoundException("Game Not Found!");

		try {
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

			await this.prisma.game.update({
				where: { id: game.id },
				data: { teams: { set: data.teams } }
			});
		} catch (error) {
			this.logger.error(error.message);
			throw new InternalServerErrorException(error);
		}

		this.logger.log("Teams Created");
		return true;
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
