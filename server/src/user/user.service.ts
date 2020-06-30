import {
	ConflictException,
	Injectable,
	Logger,
	UnauthorizedException
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import bcrypt from "bcryptjs";
import { Model } from "mongoose";
import { generateAvatar } from "../utils";
import { CreateUserInput, LoginInput } from "./user.inputs";
import { User } from "./user.schema";

@Injectable()
export class UserService {
	constructor(
		@InjectModel("User")
		private readonly userModel: Model<User>
	) {}

	private readonly logger = new Logger("UserService");

	async login({ email, password }: LoginInput) {
		const user = await this.userModel.findOne({ email }).exec();
		if (!user) throw new UnauthorizedException("Invalid Credentials!");

		const hash = await bcrypt.hash(password, user?.salt);
		if (hash !== user.password)
			throw new UnauthorizedException("Invalid Creadentials!");

		return user;
	}

	async createUser({ email, password: pwd, name }: CreateUserInput) {
		const salt = await bcrypt.genSalt(16);
		const password = await bcrypt.hash(pwd, salt);
		const avatar = generateAvatar();

		const exists = await this.userModel.exists({ email });
		if (exists) throw new ConflictException("User Already Exists!");

		let user = new this.userModel({ name, email, password, avatar, salt });
		user = await user.save();
		this.logger.log(`User Created: ${user.id}`);

		return user;
	}
}
