import { Game } from "../game/game.entity";
import { GameActivityKind } from "../utils";

export class CreateGameActivityInput {
	game: Game;
	description: string;
	kind: GameActivityKind;
}
