import { Field, ID, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { GameToUserType } from "../game-to-user/game-to-user.type";
import { GameStatus } from "../utils";

registerEnumType(GameStatus, { name: "GameStatus" });

@ObjectType("Game")
export class GameType {
	@Field(() => ID) id: string;
	@Field() gameCode: string;
	@Field(() => GameStatus) status: GameStatus;
	@Field(() => Int) noOfPlayers: number;

	@Field({ nullable: true }) teamA: string;
	@Field({ nullable: true }) teamB: string;
	@Field(() => Int) teamAScore: number;
	@Field(() => Int) teamBScore: number;

	@Field(() => [GameToUserType]) teamAMembers: GameToUserType[];
	@Field(() => [GameToUserType]) teamBMembers: GameToUserType[];
}
