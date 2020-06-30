import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { UserResolver } from "./user.resolver";
import { UserSchema } from "./user.schema";
import { UserService } from "./user.service";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
		PassportModule.register({ defaultStrategy: "jwt" }),
		JwtModule.registerAsync({
			useFactory: (configService: ConfigService) => {
				const secret = configService.get<string>("JWT_SECRET");
				return { secret, expiresIn: 7 * 24 * 60 * 60 };
			},
			inject: [ConfigService],
			imports: [ConfigModule]
		}),
		ConfigModule
	],
	providers: [UserService, UserResolver, JwtStrategy],
	exports: [PassportModule, JwtStrategy]
})
export class UserModule {}
