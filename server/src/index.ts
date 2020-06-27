import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchema } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-fastify";
import fastify, { FastifyRequest } from "fastify";
import { join } from "path";
import { resolvers } from "./resolvers";
import { getAuthUser } from "./utils/getAuthUser";

const bootstrap = async () => {
	const schema = await loadSchema(join(__dirname, "schema.graphql"), {
		loaders: [new GraphQLFileLoader()]
	});

	const server = new ApolloServer({
		schema: addResolversToSchema(schema, resolvers),
		context: async ({ headers }: FastifyRequest) => {
			const prisma = new PrismaClient();
			const user = await getAuthUser(headers, prisma);
			return { user, prisma };
		}
	});

	const app = fastify();
	app.register(server.createHandler());
	await app.listen(8000);
	console.log(`server listening on 8000`);
};

bootstrap();
