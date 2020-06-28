import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class CreateTeamsInput {
	@Field() @IsNotEmpty() gameId: string;
	@Field() @IsNotEmpty() teamA: string;
	@Field() @IsNotEmpty() teamB: string;
}
