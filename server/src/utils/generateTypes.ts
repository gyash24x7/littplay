import { GraphQLDefinitionsFactory } from "@nestjs/graphql";
import { join } from "path";

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
	typePaths: [join(process.cwd(), "src/graphql/schema.graphql")],
	path: join(process.cwd(), "src/graphql/generated.ts"),
	emitTypenameField: false
});
