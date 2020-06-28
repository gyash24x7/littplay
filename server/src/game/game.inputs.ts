import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsNotEmpty } from "class-validator";

@InputType()
export class CreateTeamsInput {
	@Field() @IsNotEmpty() gameId: string;
	@Field(() => [String]) @IsArray() @IsNotEmpty({ each: true }) teams: string[];
}
