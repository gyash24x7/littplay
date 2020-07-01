import {
	Inject,
	Injectable,
	InternalServerErrorException,
	Logger,
	UnauthorizedException
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Db, ObjectID } from "mongodb";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./user.type";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@Inject("Database") private readonly db: Db,
		configService: ConfigService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get<string>("JWT_SECRET"),
			ignoreExpiration: false
		});
	}

	private logger = new Logger("JwtStrategy");

	async validate({ _id }: any) {
		const user = await this.db
			.collection<User>("users")
			.findOne({ _id: new ObjectID(_id) })
			.catch((err) => {
				this.logger.error(err);
				throw new InternalServerErrorException();
			});

		if (!user) throw new UnauthorizedException();
		return user;
	}
}
