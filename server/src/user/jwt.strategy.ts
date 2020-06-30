import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./user.schema";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@InjectModel("User")
		private readonly userModel: Model<User>,
		configService: ConfigService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get<string>("JWT_SECRET"),
			ignoreExpiration: false
		});
	}

	async validate({ id }: { id: string }) {
		const user = await this.userModel.findById(id).exec();
		if (!user) throw new UnauthorizedException();
		return user;
	}
}
