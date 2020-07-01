import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ObjectID } from "mongodb";

@ObjectType()
export class User {
	@Field(() => ID) _id: ObjectID;
	@Field() name: string;
	@Field() email: string;
	@Field() avatar: string;
	//DB ONLY FIELDS
	salt: string;
	password: string;
}
