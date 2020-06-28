import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcryptjs";
import { PrismaService } from "../prisma/prisma.service";
import { AvatarService } from "./avatar.service";
import { CreateUserInput, LoginInput } from "./user.inputs";

@Injectable()
export class UserService {
	private logger = new Logger("UserService");
	constructor(
		private readonly prisma: PrismaService,
		private readonly avatarService: AvatarService,
		private readonly jwtService: JwtService
	) {}

	async createUser({ name, email, password }: CreateUserInput) {
		const salt = await bcrypt.genSalt(16);
		const hash = await bcrypt.hash(password, salt);
		const avatar = this.avatarService.generateAvatar();

		const user = await this.prisma.user.create({
			data: {
				name,
				email,
				password: hash,
				salt,
				avatar
			}
		});

		this.logger.log(`User Created: ${user.id}`);
		return this.jwtService.sign({ id: user.id });
	}

	async login({ email, password }: LoginInput) {
		const user = await this.prisma.user.findOne({ where: { email } });
		if (!user) throw new UnauthorizedException("Invalid Credentials!");

		const hash = await bcrypt.hash(password, user?.salt);
		if (hash !== user.password)
			throw new UnauthorizedException("Invalid Creadentials!");

		return this.jwtService.sign({ id: user.id });
	}
}
