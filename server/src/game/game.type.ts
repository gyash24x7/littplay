import { Field, ID, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { GameStatus } from "@prisma/client";
import { GameActivityType } from "../game-activity/game-activity.type";
import { TeamType } from "../team/team.type";
import { UserType } from "../user/user.type";

registerEnumType(GameStatus, { name: "GameStatus" });

@ObjectType("Game")
export class GameType {
	@Field(() => ID) id: string;
	@Field() code: string;
	@Field(() => GameStatus) status: GameStatus;
	@Field(() => Int) playerCount: number;
	@Field(() => [UserType]) players: UserType[];
	@Field(() => [TeamType]) teams: TeamType[];
	@Field(() => [GameActivityType]) activity: GameActivityType[];
}
