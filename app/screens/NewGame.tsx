import { Button, Layout, Text } from "@ui-kitten/components";
import React, { useContext } from "react";
import { AsyncStorage } from "react-native";
import globalStyles from "../theme/globalStyles";
import { AuthContext } from "../utils/context";

export const NewGameScreen = () => {
	const { setIsAuthenticated } = useContext(AuthContext)!;
	return (
		<Layout style={globalStyles.wrapper}>
			<Text>NewGameScreen</Text>
			<Button
				onPress={() =>
					AsyncStorage.clear().then(() => setIsAuthenticated(false))
				}
			>
				LOGOUT
			</Button>
		</Layout>
	);
};
