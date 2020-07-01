import { Field, InputType } from "@nestjs/graphql";
import { IsMongoId, IsNotEmpty, Length } from "class-validator";
import { User } from "../user/user.type";

@InputType()
export class CreateTeamsInput {
	@Field() @IsMongoId() gameId: string;

	@Field(() => [String])
	@IsNotEmpty({ each: true })
	@Length(2, 2)
	teams: string[];
}

export class JoinGameDto {
	code: string;
	user: User;
}
