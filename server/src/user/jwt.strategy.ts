import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { PrismaClient } from "@prisma/client";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(@Inject("PrismaClient") private readonly prisma: PrismaClient) {
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
