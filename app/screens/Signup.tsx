import { useNavigation } from "@react-navigation/native";
import { Button, Layout, Text } from "@ui-kitten/components";
import React from "react";
import globalStyles from "../theme/globalStyles";

export const SignupSCreen = () => {
	const { navigate } = useNavigation();
	return (
		<Layout style={globalStyles.wrapper}>
			<Text>SignupSCreen</Text>

			<Button onPress={() => navigate("Login")}>Signup</Button>
		</Layout>
	);
};
