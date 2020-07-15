import { UseGuards, ValidationPipe } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { AuthUser } from "./auth-user.decorator";
import { GqlAuthGuard } from "./gql-auth.guard";
import { CreateUserInput, LoginInput } from "./user.inputs";
import { UserService } from "./user.service";
import { User } from "./user.type";

@Resolver(() => User)
export class UserResolver {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService
	) {}

	@Mutation(() => String)
	async login(@Args("data", ValidationPipe) data: LoginInput) {
		const { _id } = await this.userService.login(data);
		return this.jwtService.sign({ _id });
	}

	@Mutation(() => String)
	async createUser(@Args("data", ValidationPipe) data: CreateUserInput) {
		const { _id } = (await this.userService.createUser(data))!;
		return this.jwtService.sign({ _id });
	}

	@Query(() => User)
	@UseGuards(GqlAuthGuard)
	me(@AuthUser() user: User) {
		return user;
	}

	@Mutation(() => Boolean)
	@UseGuards(GqlAuthGuard)
	async updateAvatar(@Args("avatar") avatar: string, @AuthUser() user: User) {
		return this.userService.updateUserAvatar(avatar, user);
	}
}
