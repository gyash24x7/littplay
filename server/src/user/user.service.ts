import {
	ConflictException,
	Inject,
	Injectable,
	InternalServerErrorException,
	Logger,
	UnauthorizedException
} from "@nestjs/common";
import bcrypt from "bcryptjs";
import { Db } from "mongodb";
import { generateAvatar } from "../utils";
import { CreateUserInput, LoginInput } from "./user.inputs";
import { User } from "./user.type";

@Injectable()
export class UserService {
	constructor(@Inject("Database") private readonly db: Db) {}

	private readonly logger = new Logger("UserService");

	async login({ email, password }: LoginInput) {
		const user = await this.db.collection("users").findOne<User>({ email });
		if (!user) throw new UnauthorizedException("Invalid Credentials!");

		const hash = await bcrypt.hash(password, user?.salt);
		if (hash !== user.password)
			throw new UnauthorizedException("Invalid Creadentials!");

		return user;
	}

	async createUser({ email, password: pwd, name }: CreateUserInput) {
		const salt = await bcrypt.genSalt(16);
		const password = await bcrypt.hash(pwd, salt);
		const avatar = generateAvatar().url;

		let user = await this.db.collection<User>("users").findOne({ email });
		if (user) throw new ConflictException("User Already Exists!");

		const { insertedId } = await this.db
			.collection<User>("users")
			.insertOne({ name, salt, password, avatar, email })
			.catch((err) => {
				this.logger.error(err);
				throw new InternalServerErrorException();
			});

		this.logger.log(`User Created: ${insertedId}`);
		return this.db.collection<User>("users").findOne({ _id: insertedId });
	}

	async updateUserAvatar(avatar: string, user: User) {
		const { modifiedCount } = await this.db
			.collection<User>("users")
			.updateOne({ _id: user._id }, { $set: { avatar } }, { upsert: false })
			.catch((err) => {
				this.logger.error(err);
				throw new InternalServerErrorException();
			});

		return modifiedCount === 1;
	}
}
