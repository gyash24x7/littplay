import { Button, Card } from "@ui-kitten/components";
import React, { useState } from "react";
import { Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useHistory } from "react-router-dom";

import styles from "../styles";
import { User } from "../typings";
import firebase, { AuthProvider } from "../utils/firebase";

export const LoginScreen = () => {
	const history = useHistory();
	const [loading, setLoading] = useState(false);

	const login = async () => {
		setLoading(true);
		const result: any = await firebase.auth().signInWithPopup(AuthProvider);
		const token = result.credential.accessToken;
		const user: User = {
			displayName: result.user.displayName,
			photoUrl: result.user.photoUrl,
			phoneNumber: result.user.phoneNumber,
			email: result.user.email
		};
		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("token", token);
		setLoading(false);
		history.push("/");
	};

	return (
		<LinearGradient
			colors={["#c6ffdd", "#fbd786", "#f7797d"]}
			style={styles.wrapper}
		>
			<Card style={styles.card}>
				<Image
					source={{ uri: require("../assets/icon.png") }}
					style={styles.logo}
				/>
				<Button onPress={login} disabled={loading}>
					{loading ? "Loading..." : "Log in with Google"}
				</Button>
			</Card>
		</LinearGradient>
	);
};
