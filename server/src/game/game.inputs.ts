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

@InputType()
export class AskCardInput {
	@Field() @IsNotEmpty() @IsMongoId() gameId: string;
	@Field() @IsNotEmpty() @IsMongoId() askedFrom: string;
	@Field() @IsNotEmpty() @IsMongoId() askedFor: string;
}

export class GiveCardInput {
	gameId: string;
	cardToGive: string;
	giveTo: string;
}

export class DeclineCardInput {
	cardDeclined: string;
	gameId: string;
}

export class CallSetInput {
	callData: string; //stringified JSON of type: Record<userId,cardArray>
	gameId: string;
}
