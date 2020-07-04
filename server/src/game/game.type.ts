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

export enum MoveType {
	ASK = "ASK",
	DECLINED = "DECLINED",
	GIVEN = "GIVEN",
	TURN = "TURN",
	CALL = "CALL",
	CALL_SUCCESS = "CALL_SUCCESS",
	CALL_FAIL = "CALL_FAIL"
}

registerEnumType(GameStatus, { name: "GameStatus" });
registerEnumType(MoveType, { name: "MoveType" });

@ObjectType()
export class Player extends User {
	@Field(() => [String]) hand: string[];
	@Field() team: string;
}

@ObjectType()
export class Move {
	@Field(() => MoveType) type: MoveType;
	@Field() description: string;
	@Field({ nullable: true }) turn?: string;

	@Field({ nullable: true }) askedFrom?: string;
	@Field({ nullable: true }) askedBy?: string;
	@Field({ nullable: true }) askedFor?: string;

	@Field({ nullable: true }) callSetData?: string;
}

@ObjectType()
export class Team {
	@Field() name: string;
	@Field(() => Int) score: number;
}

@ObjectType()
export class Game {
	@Field(() => ID) _id: ObjectID;
	@Field() code: string;
	@Field(() => User) createdBy: User;
	@Field(() => [Player]) players: Player[];
	@Field(() => GameStatus) status: GameStatus;
	@Field(() => Int) playerCount: number;
	@Field(() => [Team]) teams: Team[];
	@Field(() => Move, { nullable: true }) secondLastMove?: Move;
	@Field(() => Move, { nullable: true }) lastMove?: Move;
	@Field(() => Move, { nullable: true }) currentMove?: Move;
}
