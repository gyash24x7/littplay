import { Layout } from "@ui-kitten/components";
import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useHistory } from "react-router-dom";

import styles from "../styles";

export const LoadingScreen = () => {
	const history = useHistory();
	const loggedIn = !!localStorage.getItem("user");

	useEffect(() => {
		history.push(loggedIn ? "/" : "/login");
	});

	return (
		<Layout style={styles.wrapper}>
			<ActivityIndicator />
		</Layout>
	);
};
