import { Button, Card } from "@ui-kitten/components";
import React from "react";
import { Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import { GoogleIcon } from "../icons";
import styles from "../styles";

export const LoginScreen = ({ navigation }: any) => {
	return (
		<SafeAreaView style={{ height: "100%" }}>
			<LinearGradient
				colors={["#c6ffdd", "#fbd786", "#f7797d"]}
				style={styles.wrapper}
			>
				<Card style={styles.card}>
					<Image
						source={{ uri: require("../assets/icon.png") }}
						style={styles.logo}
					/>
					<Button icon={GoogleIcon} onPress={() => navigation.navigate("home")}>
						Log in with Google
					</Button>
				</Card>
			</LinearGradient>
		</SafeAreaView>
	);
};
