import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Game } from "../game/game.entity";
import { GameActivityKind } from "../utils";

@Entity()
export class GameActivity {
	@PrimaryColumn() id: string;
	@Column() description: string;

	@Column() gameId: string;
	@ManyToOne(() => Game, (game) => game.activity) game: Game;

	@Column("enum", { enum: GameActivityKind }) kind: GameActivityKind;
}
