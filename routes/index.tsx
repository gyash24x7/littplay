import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { HomeScreen } from "../screens/Home";
import { LoginScreen } from "../screens/Login";

const { Navigator, Screen } = createStackNavigator();

export const AppRoutes = () => {
	return (
		<NavigationContainer>
			<Navigator>
				<Screen name="home" component={HomeScreen} />
				<Screen name="login" component={LoginScreen} />
			</Navigator>
		</NavigationContainer>
	);
};
