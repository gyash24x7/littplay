import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { GameActivityKind } from "@prisma/client";
import { GameType } from "../game/game.type";

registerEnumType(GameActivityKind, { name: "GameActivityKind" });

@ObjectType("GameActivity")
export class GameActivityType {
	@Field(() => ID) id: string;
	@Field() description: string;
	@Field(() => GameActivityKind) kind: GameActivityKind;
	@Field(() => GameType) game: GameType;
}
