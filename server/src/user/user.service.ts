import {
	ConflictException,
	Injectable,
	InternalServerErrorException,
	Logger,
	UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import bcrypt from "bcryptjs";
import cuid from "cuid";
import { Repository } from "typeorm";
import { generateAvatar } from "../utils/generateAvatar";
import { User } from "./user.entity";
import { CreateUserInput, LoginInput } from "./user.inputs";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private readonly userRepo: Repository<User>,
		private readonly jwtService: JwtService
	) {}

	private readonly logger = new Logger("UserService");

	async signUp(data: CreateUserInput) {
		let user: User;
		const id = cuid();
		const avatar = generateAvatar();
		const salt = await bcrypt.genSalt(15);
		const password = await bcrypt.hash(data.password, salt);

		try {
			user = await this.userRepo.save({ ...data, id, avatar, salt, password });
			this.logger.log(`User Created: ${user.id}`);
		} catch (error) {
			if (error.code === "23505") {
				throw new ConflictException("User Already Exists!");
			} else throw new InternalServerErrorException(error);
		}

		const accessToken = this.jwtService.sign({ id: user.id });
		return accessToken;
	}

	async login({ email, password }: LoginInput) {
		const user = await this.userRepo.findOne({ where: { email } });
		if (!user) throw new UnauthorizedException("Invalid Credentials!");

		const valid = await bcrypt.compare(password, user.password);
		if (!valid) throw new UnauthorizedException("Invalid Credentials!");

		this.logger.log(`User logged in: ${user.id}`);
		const accessToken = this.jwtService.sign({ id: user.id });
		return accessToken;
	}
}
