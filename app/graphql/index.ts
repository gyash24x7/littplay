import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/link-context";
import { WebSocketLink } from "@apollo/link-ws";
import { AsyncStorage } from "react-native";

const wsLink = new WebSocketLink({
	uri: `ws://192.168.43.59:8000/graphql`,
	options: {
		reconnect: true,
		connectionParams: async () => {
			const token = await AsyncStorage.getItem("authToken");
			return { authToken: token && `Bearer ${token}` };
		}
	}
});

const authLink = setContext(async (_, { headers }) => {
	const token = await AsyncStorage.getItem("authToken");
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : undefined
		}
	};
});

const httpLink = new HttpLink({ uri: "http://192.168.43.59:8000/graphql" });

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
	link: authLink.concat(splitLink)
});
