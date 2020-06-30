import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: "jwt" }),
		JwtModule.registerAsync({
			useFactory: (configService: ConfigService) => {
				const secret = configService.get<string>("JWT_SECRET");
				return { secret, expiresIn: 7 * 24 * 60 * 60 };
			},
			inject: [ConfigService]
		})
	],
	providers: [UserService, UserResolver, JwtStrategy],
	exports: [PassportModule, JwtStrategy]
})
export class UserModule {}
