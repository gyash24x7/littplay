import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import { ActivityIndicator, useWindowDimensions, View } from "react-native";

import styles from "../styles";
import { UserContext } from "../utils/context";

export const LoadingScreen = () => {
	const navigation = useNavigation();
	const { user } = useContext(UserContext);
	const { width, height } = useWindowDimensions();

	useEffect(() => {
		navigation.navigate(!!user.email ? "Home" : "Login");
	});

	return (
		<View style={[styles.wrapper, { width, height }]}>
			<ActivityIndicator />
		</View>
	);
};
