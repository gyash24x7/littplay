import { Text } from "@ui-kitten/components";
import React from "react";
import { SafeAreaView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useParams } from "react-router-dom";

import styles from "../styles";

export const GameScreen = () => {
	const { gameId } = useParams();
	return (
		<SafeAreaView style={{ height: "100%" }}>
			<LinearGradient
				colors={["#c6ffdd", "#fbd786", "#f7797d"]}
				style={styles.wrapper}
			>
				<Text>{gameId}</Text>
			</LinearGradient>
		</SafeAreaView>
	);
};
