import { Field, ID, ObjectType } from "@nestjs/graphql";
import { UserType } from "../user/user.type";

@ObjectType("Team")
export class TeamType {
	@Field(() => ID) id: string;
	@Field() name: string;
	@Field(() => [UserType]) members: UserType[];
}
