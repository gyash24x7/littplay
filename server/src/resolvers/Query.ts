import { QueryResolvers } from "../generated";

export const Query: QueryResolvers = {
	async me(_parent, _args, { user }) {
		if (!user) throw new Error("Unauthorized!");
		return user;
	}
};
