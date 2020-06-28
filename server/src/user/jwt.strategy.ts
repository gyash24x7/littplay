import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly prisma: PrismaService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: "topsecret51",
			ignoteExpiration: false
		});
	}

	async validate({ id }: { id: string }) {
		const user = await this.prisma.user.findOne({ where: { id } });
		if (!user) throw new UnauthorizedException();
		return user;
	}
}
