import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty } from "class-validator";

@InputType("CreateUserInput")
export class CreateUserInput {
	@Field() @IsEmail() email: string;
	@Field() @IsNotEmpty() name: string;
	@Field() @IsNotEmpty() password: string;
}

@InputType("LoginInput")
export class LoginInput {
	@Field() @IsEmail() email: string;
	@Field() @IsNotEmpty() password: string;
}
