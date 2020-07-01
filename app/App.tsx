import { ApolloProvider } from "@apollo/client";
import * as eva from "@eva-design/eva";
import {
	ApplicationProvider,
	IconRegistry,
	Layout,
	Text
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ShowError } from "./components/ShowError";
import { client } from "./graphql";
import { default as mapping } from "./theme/mapping.json";

export default function App() {
	const [fontsLoaded] = useFonts({
		"montserrat-regular": require("./assets/fonts/montserrat-regular.ttf"),
		"montserrat-bold": require("./assets/fonts/montserrat-bold.ttf"),
		"montserrat-light": require("./assets/fonts/montserrat-light.ttf")
	});

	if (fontsLoaded) {
		return (
			<SafeAreaProvider>
				<IconRegistry icons={[EvaIconsPack]} />
				<ApolloProvider client={client}>
					<ApplicationProvider
						{...eva}
						theme={{ ...eva.light }}
						customMapping={{ ...eva.mapping, ...mapping }}
					>
						<Layout style={styles.container}>
							<Text>Hello</Text>
							<ShowError />
						</Layout>
					</ApplicationProvider>
				</ApolloProvider>
			</SafeAreaProvider>
		);
	} else {
		return <AppLoading />;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	}
});
