import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { PrismaModule } from "../prisma/prisma.module";
import { JwtStrategy } from "./jwt.strategy";
import { UserResolver } from "./user.resolver";

@Module({
	providers: [UserResolver, JwtStrategy],
	imports: [
		PassportModule.register({ defaultStrategy: "jwt" }),
		JwtModule.register({
			secret: "topsecret51",
			signOptions: { expiresIn: 7 * 24 * 60 * 60 }
		}),
		PrismaModule
	],
	exports: [PassportModule, JwtStrategy]
})
export class UserModule {}
