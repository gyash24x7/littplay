import { Field, ID, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { ObjectID } from "mongodb";
import { User } from "../user/user.type";

export enum GameStatus {
	NOT_STARTED = "NOT_STARTED",
	PLAYERS_READY = "PLAYERS_READY",
	TEAMS_CREATED = "TEAMS_CREATED",
	IN_PROGRESS = "IN_PROGRESS",
	COMPLETED = "COMPLETED"
}

registerEnumType(GameStatus, { name: "GameStatus" });

@ObjectType()
export class Game {
	@Field(() => ID) _id: ObjectID;
	@Field() code: string;
	@Field(() => User) createdBy: User;
	@Field(() => [Player]) players: Player[];
	@Field(() => GameStatus) status: GameStatus;
	@Field(() => Int) playerCount: number;
	@Field(() => [String]) teams: string[];
}

@ObjectType()
export class Player extends User {
	@Field(() => [String]) hand: string[];
	@Field() team: string;
}

@ObjectType()
export class Move {
	type: string;
	turn?: string;
}
