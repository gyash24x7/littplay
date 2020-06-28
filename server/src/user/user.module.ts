import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { PrismaModule } from "../prisma/prisma.module";
import { AvatarService } from "./avatar.service";
import { JwtStrategy } from "./jwt.strategy";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
	providers: [UserResolver, UserService, AvatarService, JwtStrategy],
	imports: [
		PassportModule.register({ defaultStrategy: "jwt" }),
		JwtModule.register({
			secret: "topsecret51",
			signOptions: { expiresIn: 7 * 24 * 60 * 60 }
		}),
		PrismaModule
	],
	exports: [UserService, PassportModule, JwtStrategy]
})
export class UserModule {}
