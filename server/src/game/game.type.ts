import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { GameStatus } from "@prisma/client";
import { UserType } from "../user/user.type";

registerEnumType(GameStatus, { name: "GameStatus" });

@ObjectType("Game")
export class GameType {
	@Field(() => ID) id: string;
	@Field() code: string;
	@Field(() => GameStatus) status: GameStatus;
	@Field(() => [UserType]) players: UserType[];
}
