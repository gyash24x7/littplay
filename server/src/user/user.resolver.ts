import { Logger, UnauthorizedException, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { PrismaService } from "../prisma/prisma.service";
import { generateAvatar } from "../utils";
import { AuthUser } from "./auth-user.decorator";
import { GqlAuthGuard } from "./gql-auth.guard";
import { CreateUserInput, LoginInput } from "./user.inputs";
import { UserType } from "./user.type";

@Resolver(() => UserType)
export class UserResolver {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService
	) {}

	private readonly logger = new Logger("UserResolver");

	@Mutation(() => String)
	async login(@Args("data") { email, password }: LoginInput) {
		const user = await this.prisma.user.findOne({ where: { email } });
		if (!user) throw new UnauthorizedException("Invalid Credentials!");

		const hash = await bcrypt.hash(password, user?.salt);
		if (hash !== user.password)
			throw new UnauthorizedException("Invalid Creadentials!");

		return this.jwtService.sign({ id: user.id });
	}

	@Mutation(() => String)
	async createUser(@Args("data") data: CreateUserInput) {
		const salt = await bcrypt.genSalt(16);
		const password = await bcrypt.hash(data.password, salt);
		const avatar = generateAvatar();

		const user = await this.prisma.user.create({
			data: { ...data, password, salt, avatar }
		});

		this.logger.log(`User Created: ${user.id}`);
		return this.jwtService.sign({ id: user.id });
	}

	@Query(() => UserType)
	@UseGuards(GqlAuthGuard)
	me(@AuthUser() user: User) {
		return user;
	}
}
