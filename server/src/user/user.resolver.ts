import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "@prisma/client";
import { AuthUser } from "./auth-user.decorator";
import { GqlAuthGuard } from "./gql-auth.guard";
import { CreateUserInput, LoginInput } from "./user.inputs";
import { UserService } from "./user.service";
import { UserType } from "./user.type";

@Resolver(() => UserType)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Mutation(() => String)
	login(@Args("data") data: LoginInput) {
		return this.userService.login(data);
	}

	@Mutation(() => String)
	createUser(@Args("data") data: CreateUserInput) {
		return this.userService.createUser(data);
	}

	@Query(() => UserType)
	@UseGuards(GqlAuthGuard)
	me(@AuthUser() user: User) {
		return user;
	}
}
