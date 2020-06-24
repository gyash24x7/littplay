import { Field, ID, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { UserType } from "../user/user.type";
import { GameStatus } from "../utils";

registerEnumType(GameStatus, { name: "GameStatus" });

@ObjectType("Game")
export class GameType {
	@Field(() => ID) id: string;
	@Field() gameCode: string;
	@Field() teamAName: string;
	@Field() teamBName: string;

	@Field(() => [String]) teamAPlayers: string[];
	@Field(() => [String]) teamBPlayers: string[];
	@Field(() => GameStatus) status: GameStatus;
	@Field(() => Int) noOfPlayers: number;

	@Field(() => [String], { nullable: true }) a0?: string[];
	@Field(() => [String], { nullable: true }) a1?: string[];
	@Field(() => [String], { nullable: true }) a2?: string[];

	@Field(() => [String], { nullable: true }) b0?: string[];
	@Field(() => [String], { nullable: true }) b1?: string[];
	@Field(() => [String], { nullable: true }) b2?: string[];

	@Field(() => [UserType]) players: UserType[];
}
