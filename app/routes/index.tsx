import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { HomeScreen } from "../pages/Home";
import { LoginScreen } from "../pages/Login";

const { Screen, Navigator } = createStackNavigator();

export const AppRoutes = () => (
	<NavigationContainer>
		<Navigator headerMode="none" initialRouteName="Login">
			<Screen name="Home" component={HomeScreen} />
			<Screen name="Login" component={LoginScreen} />
		</Navigator>
	</NavigationContainer>
);
