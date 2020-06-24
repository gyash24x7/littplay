import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {
	@PrimaryColumn() id: string;
	@Column() name: string;
	@Column() email: string;
	@Column() password: string;
	@Column() salt: string;
	@Column() avatar: string;
}
