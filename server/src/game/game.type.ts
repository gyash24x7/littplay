import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { ObjectID } from "mongodb";
import { User } from "../user/user.type";

@ObjectType()
export class Game {
	@Field(() => ID) _id: ObjectID;
	@Field() code: string;
	@Field(() => User) createdBy: User;
	@Field(() => [Player]) players: Player[];
	@Field() status: string;
	@Field(() => Int) playerCount: number;
	@Field(() => [String]) teams: string[];
}

@ObjectType()
export class Player extends User {
	@Field(() => [String]) hand: string[];
	@Field() team: string;
}
