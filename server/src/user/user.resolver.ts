import { UseGuards, ValidationPipe } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { AuthUser } from "./auth-user.decorator";
import { GqlAuthGuard } from "./gql-auth.guard";
import { CreateUserInput, LoginInput } from "./user.inputs";
import { User } from "./user.schema";
import { UserService } from "./user.service";
import { UserType } from "./user.type";

@Resolver(() => UserType)
export class UserResolver {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService
	) {}

	@Mutation(() => String)
	async login(@Args("data", ValidationPipe) data: LoginInput) {
		const user = await this.userService.login(data);
		return this.jwtService.sign({ id: user.id });
	}

	@Mutation(() => String)
	async createUser(@Args("data", ValidationPipe) data: CreateUserInput) {
		const user = await this.userService.createUser(data);
		return this.jwtService.sign({ id: user!.id });
	}

	@Query(() => UserType)
	@UseGuards(GqlAuthGuard)
	me(@AuthUser() user: User) {
		return user;
	}
}
