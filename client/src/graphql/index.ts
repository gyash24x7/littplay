import { ApolloClient, InMemoryCache, split } from "@apollo/client";
import { HttpLink } from "@apollo/client/link/http";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const token = localStorage.getItem("authToken");

const [WS_URL, HTTP_URL] =
	process.env.NODE_ENV !== "production"
		? [`ws://192.168.43.59:8000/graphql`, `http://192.168.43.59:8000/graphql`]
		: [
				`wss://literature.yashgupta.dev/graphql`,
				`https://literature.yashgupta.dev/graphql`
		  ];

const wsLink = new WebSocketLink({
	uri: WS_URL,
	options: {
		reconnect: true,
		connectionParams: { authToken: token && `Bearer ${token}` }
	}
});

const httpLink = new HttpLink({
	uri: HTTP_URL,
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
