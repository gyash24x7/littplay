import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { GameType } from "../game/game.type";
import { GameActivityKind } from "../utils";

registerEnumType(GameActivityKind, { name: "GameActivityKind" });

@ObjectType("GameActivity")
export class GameActivityType {
	@Field(() => ID) id: string;
	@Field(() => GameType) game: GameType;
	@Field() description: string;
	@Field(() => GameActivityKind) kind: GameActivityKind;
}
