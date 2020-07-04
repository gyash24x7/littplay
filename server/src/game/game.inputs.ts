import { Field, InputType } from "@nestjs/graphql";
import { IsMongoId, IsNotEmpty } from "class-validator";
import { User } from "../user/user.type";

@InputType()
export class CreateTeamsInput {
	@Field() @IsMongoId() gameId: string;
	@Field(() => [String]) @IsNotEmpty({ each: true }) teams: string[];
}

export class JoinGameDto {
	code: string;
	user: User;
}

@InputType()
export class AskCardInput {
	@Field() @IsNotEmpty() @IsMongoId() gameId: string;
	@Field() @IsNotEmpty() @IsMongoId() askedFrom: string;
	@Field() @IsNotEmpty() askedFor: string;
}

@InputType()
export class GiveCardInput {
	@Field() @IsNotEmpty() @IsMongoId() gameId: string;
	@Field() @IsNotEmpty() cardToGive: string;
	@Field() @IsNotEmpty() @IsMongoId() giveTo: string;
}

@InputType()
export class DeclineCardInput {
	@Field() @IsNotEmpty() cardDeclined: string;
	@Field() @IsNotEmpty() @IsMongoId() gameId: string;
}

@InputType()
export class CallSetInput {
	@Field() @IsNotEmpty() set: string;
	@Field() @IsNotEmpty() callData: string; //stringified JSON of type: Record<userId,cardArray>
	@Field() @IsNotEmpty() @IsMongoId() gameId: string;
}
