import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { HomeScreen } from "../screens/Home";
import { LoginScreen } from "../screens/Login";

const { Navigator, Screen } = createStackNavigator();

export const AppRoutes = () => {
	return (
		<NavigationContainer>
			<Navigator initialRouteName="Home" headerMode="none">
				<Screen
					name="Home"
					component={HomeScreen}
					options={{ title: "Literature" }}
				/>
				<Screen name="Login" component={LoginScreen} />
			</Navigator>
		</NavigationContainer>
	);
};
