import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {
	@Prop({ required: true }) name: string;
	@Prop({ required: true }) email: string;
	@Prop({ required: true }) salt: string;
	@Prop({ required: true }) password: string;
	@Prop({ required: true }) avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
