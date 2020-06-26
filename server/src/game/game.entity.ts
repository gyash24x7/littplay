import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryColumn
} from "typeorm";
import { GameActivity } from "../game-activity/game-activity.entity";
import { User } from "../user/user.entity";
import { GameStatus } from "../utils";

@Entity()
export class Game {
	@PrimaryColumn() id: string;
	@Column({ unique: true }) gameCode: string;
	@Column({ nullable: true }) teamA?: string;
	@Column({ nullable: true }) teamB?: string;

	@Column({ default: 6, type: "int" }) noOfPlayers: number;
	@Column({ type: "enum", enum: GameStatus, default: GameStatus.NOT_STARTED })
	status: GameStatus;

	@Column({ nullable: true, type: "simple-array" }) a0?: string[];
	@Column({ nullable: true, type: "simple-array" }) a1?: string[];
	@Column({ nullable: true, type: "simple-array" }) a2?: string[];

	@Column({ nullable: true, type: "simple-array" }) b0?: string[];
	@Column({ nullable: true, type: "simple-array" }) b1?: string[];
	@Column({ nullable: true, type: "simple-array" }) b2?: string[];

	@Column() createdById: string;
	@ManyToOne(() => User, { eager: true }) createdBy: User;

	@ManyToMany(() => User, (user) => user.games, { eager: true })
	@JoinTable()
	players: User[];

	@OneToMany(() => GameActivity, (activity) => activity.game)
	activity: GameActivity[];
}
