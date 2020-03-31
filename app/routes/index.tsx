import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { LoadingScreen } from "../screens/Loading";
import { LoginScreen } from "../screens/Login";

const { Navigator, Screen } = createStackNavigator();

export const AppRoutes = () => (
	<NavigationContainer>
		<Navigator initialRouteName="Loading">
			{/* <Screen name="Home" component={HomeScreen} />
			<Screen name="Game" component={GameScreen} />*/}
			<Screen name="Login" component={LoginScreen} />
			<Screen name="Loading" component={LoadingScreen} />
		</Navigator>
	</NavigationContainer>
);
