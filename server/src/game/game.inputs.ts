import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType("CreateTeamsInput")
export class CreateTeamsInput {
	@Field() @IsNotEmpty() gameId: string;
	@Field() @IsNotEmpty() teamAName: string;
	@Field() @IsNotEmpty() teamBName: string;
	@Field(() => [String]) @IsNotEmpty({ each: true }) teamAPlayers: string[];
	@Field(() => [String]) @IsNotEmpty({ each: true }) teamBPlayers: string[];
}
