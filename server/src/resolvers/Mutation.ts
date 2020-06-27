import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { MutationResolvers } from "../generated";
import { generateAvatar } from "../utils/generateAvatar";

export const Mutation: MutationResolvers = {
	async createUser(_, { data }, { prisma }) {
		const salt = await bcrypt.genSalt(16);
		const password = await bcrypt.hash(data.password, salt);
		const avatar = generateAvatar();

		const user = await prisma.user.create({
			data: { ...data, password, salt, avatar }
		});

		if (!user) throw new Error("Internal Server Error!");

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
		return token;
	},

	async login(_, { data: { email, password } }, { prisma }) {
		const user = await prisma.user.findOne({ where: { email } });
		if (!user) throw new Error("Invalid Credentials!");

		const hash = await bcrypt.hash(password, user.salt);
		if (hash !== user.password) throw new Error("Invalid Credentials!");

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
		return token;
	}
};
