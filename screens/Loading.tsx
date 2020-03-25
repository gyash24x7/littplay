import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useHistory } from "react-router-dom";

import styles from "../styles";

export const LoadingScreen = () => {
	const history = useHistory();
	const loggedIn = !!localStorage.getItem("user");

	useEffect(() => {
		history.push(loggedIn ? "/" : "/login");
	});

	return (
		<LinearGradient
			colors={["#c6ffdd", "#fbd786", "#f7797d"]}
			style={styles.wrapper}
		>
			<ActivityIndicator />
		</LinearGradient>
	);
};
