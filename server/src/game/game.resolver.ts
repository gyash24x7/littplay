import {
	BadRequestException,
	Inject,
	InternalServerErrorException,
	Logger,
	NotFoundException,
	UseGuards
} from "@nestjs/common";
import {
	Args,
	Info,
	Mutation,
	Query,
	Resolver,
	Subscription
} from "@nestjs/graphql";
import { Game, GameActivityType, GameStatus, User } from "@prisma/client";
import { PubSubEngine } from "apollo-server-fastify";
import cuid from "cuid";
import { GraphQLResolveInfo } from "graphql";
import { CreateTeamsInput, GameActivity } from "../graphql/generated";
import { validateCreateTeamsInput } from "../graphql/validateInputs";
import { PrismaService } from "../prisma/prisma.service";
import { AuthUser } from "../user/auth-user.decorator";
import { GqlAuthGuard } from "../user/gql-auth.guard";
import { shuffle, splitArray } from "../utils";

@Resolver("Game")
export class GameResolver {
	constructor(
		private readonly prisma: PrismaService,
		@Inject("PubSub") private readonly pubsub: PubSubEngine
	) {}

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
	async joinGame(@Args("code") code: string, @AuthUser() { id, name }: User) {
		let game = await this.prisma.game.findOne({
			where: { code },
			include: { players: true }
		});

		if (!game) throw new NotFoundException("Game Not Found!");

		if (game.playerCount === game.players.length)
			throw new BadRequestException("This Game already has 6 players!");

		if (game.players.map((player) => player.userId).includes(id)) {
			return game.id;
		}

		try {
			game = await this.prisma.game.update({
				where: { code },
				data: { players: { create: { user: { connect: { id } } } } },
				include: { players: true }
			});

			const gameActivity = await this.prisma.gameActivity.create({
				data: {
					game: { connect: { id: game.id } },
					description: `${name} joined the game.`,
					type: GameActivityType.PLAYER_JOINED,
					data: ""
				},
				include: { game: { include: { players: { include: { user: true } } } } }
			});

			this.logger.log(`Game Activity Created: ${gameActivity.id}`);
			await this.pubsub.publish(game.id, gameActivity);
			this.logger.log(`Player Join Notification Published!`);
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
				data: { teams: { set: data.teams }, status: GameStatus.TEAMS_CREATED }
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

	@Mutation()
	@UseGuards(GqlAuthGuard)
	async startGame(@Args("gameId") gameId: string) {
		return !!gameId;
	}

	@Subscription(() => GameActivity, { resolve: (value) => value })
	async gameActivity(@Args("gameId") gameId: string) {
		return this.pubsub.asyncIterator(gameId);
	}
}
