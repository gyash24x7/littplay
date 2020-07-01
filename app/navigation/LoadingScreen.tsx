import { Layout, Spinner } from "@ui-kitten/components";
import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const LoadingScreen = () => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar backgroundColor="#fff" barStyle="dark-content" />
			<Layout
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100%"
				}}
			>
				<Spinner />
			</Layout>
		</SafeAreaView>
	);
};
