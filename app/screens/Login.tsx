import { useNavigation } from "@react-navigation/native";
import { Button, Layout, Text } from "@ui-kitten/components";
import React from "react";
import globalStyles from "../theme/globalStyles";

export const LoginScreen = () => {
	const { navigate } = useNavigation();

	return (
		<Layout style={globalStyles.wrapper}>
			<Text>LoginScreen</Text>
			<Button onPress={() => navigate("Signup")}>Signup</Button>
		</Layout>
	);
};
