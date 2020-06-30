import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType("User")
export class UserType {
	@Field(() => ID) id: string;
	@Field() name: string;
	@Field() email: string;
	@Field() avatar: string;
}
