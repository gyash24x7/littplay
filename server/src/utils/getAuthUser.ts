import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

export const getAuthUser = async (headers: any, prisma: PrismaClient) => {
	if (!headers.authorization) return;

	const token = headers.authorization.split("Bearer ")[1];
	if (!token) return;

	let id: string = "";

	try {
		const payload: any = jwt.verify(token, process.env.JWT_SECRET!);
		id = payload.id;
	} catch (e) {
		return;
	}
	const user = await prisma.user.findOne({ where: { id } });

	if (!user) return;

	return user;
};
