import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { Game } from "../game/game.entity";

@Entity()
export class User {
	@PrimaryColumn() id: string;
	@Column() name: string;
	@Column() email: string;
	@Column() password: string;
	@Column() salt: string;
	@Column() avatar: string;

	@ManyToMany(() => Game, (game) => game.players)
	games: Game[];
}
