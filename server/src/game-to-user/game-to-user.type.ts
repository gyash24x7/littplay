import { Field, ObjectType } from "@nestjs/graphql";
import { UserType } from "../user/user.type";

@ObjectType("GameToUser")
export class GameToUserType {
	@Field(() => UserType) user: UserType;
	@Field(() => [String], { nullable: true }) hand?: string[];
}
