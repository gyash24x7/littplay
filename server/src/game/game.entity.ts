import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { GameActivity } from "../game-activity/game-activity.entity";
import { GameToUser } from "../game-to-user/game-to-user.entity";
import { User } from "../user/user.entity";
import { GameStatus } from "../utils";

@Entity()
export class Game {
	@PrimaryColumn() id: string;
	@Column({ unique: true }) gameCode: string;

	@Column({ nullable: true }) teamA?: string;
	@Column({ nullable: true }) teamB?: string;
	@Column("int", { default: 0 }) teamAScore: number;
	@Column("int", { default: 0 }) teamBScore: number;

	@Column({ default: 6, type: "int" }) noOfPlayers: number;
	@Column({ type: "enum", enum: GameStatus, default: GameStatus.NOT_STARTED })
	status: GameStatus;

	@Column() createdById: string;
	@ManyToOne(() => User) createdBy: User;

	@OneToMany(() => GameToUser, (gameToUser) => gameToUser.game, { eager: true })
	gameToUsers: GameToUser[];

	@OneToMany(() => GameActivity, (activity) => activity.game)
	activity: GameActivity[];
}
