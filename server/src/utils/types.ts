import { PrismaClient, User } from "@prisma/client";

export interface GraphQLContext {
	prisma: PrismaClient;
	user?: User;
}
