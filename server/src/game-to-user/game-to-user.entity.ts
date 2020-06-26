import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Game } from "../game/game.entity";
import { User } from "../user/user.entity";

@Entity()
export class GameToUser {
	@PrimaryColumn() id: string;
	@Column({ nullable: true }) team?: string;
	@Column("simple-array", { nullable: true }) hand?: string[];

	@Column() gameId: string;
	@ManyToOne(() => Game, (game) => game.gameToUsers) game: Game;

	@Column() userId: string;
	@ManyToOne(() => User, { eager: true }) user: User;
}
