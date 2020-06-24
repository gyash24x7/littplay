import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtStrategy } from "./jwt.strategy";
import { User } from "./user.entity";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
	providers: [UserService, UserResolver, JwtStrategy],
	imports: [
		TypeOrmModule.forFeature([User]),
		PassportModule.register({ defaultStrategy: "jwt" }),
		JwtModule.register({
			secret: "topsecret51",
			signOptions: { expiresIn: 7 * 24 * 60 * 60 }
		})
	],
	exports: [UserService, PassportModule, JwtStrategy]
})
export class UserModule {}
