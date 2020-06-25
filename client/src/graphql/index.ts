import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/link-ws";

const token = localStorage.getItem("authToken");

const wsLink = new WebSocketLink({
	uri: `ws://localhost:8000/graphql`,
	options: {
		reconnect: true,
		connectionParams: { authToken: token && `Bearer ${token}` }
	}
});

const httpLink = new HttpLink({
	uri: "http://localhost:8000/graphql",
	headers: { Authorization: token && `Bearer ${token}` }
});

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === "OperationDefinition" &&
			definition.operation === "subscription"
		);
	},
	wsLink,
	httpLink
);

export const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: splitLink
});
