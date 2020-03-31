import { NavigationProp } from "@react-navigation/native";
import { Layout } from "@ui-kitten/components";
import React from "react";
import { ActivityIndicator, AsyncStorage } from "react-native";

import styles from "../styles";

interface ScreenProps {
	navigation: NavigationProp<Record<string, object>>;
}

export const LoadingScreen = ({ navigation }: ScreenProps) => {
	console.log(navigation);

	AsyncStorage.getItem("user")
		.then(val => {
			if (val) console.log("Logged In!");
		})
		.catch(err => {
			console.log("Some Error Occurred: ", err);
		});

	return (
		<Layout style={styles.wrapper}>
			<ActivityIndicator />
		</Layout>
	);
};
