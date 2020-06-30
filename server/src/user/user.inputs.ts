import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

@InputType()
export class CreateUserInput {
	@Field() @IsNotEmpty() name: string;
	@Field() @IsEmail() email: string;
	@Field() @MinLength(8) password: string;
}

@InputType()
export class LoginInput {
	@Field() @IsEmail() email: string;
	@Field() @MinLength(8) password: string;
}
