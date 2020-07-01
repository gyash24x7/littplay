import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { LoginScreen } from "../screens/Login";
import { SignupSCreen } from "../screens/Signup";

const { Navigator, Screen } = createStackNavigator();

export const PublicScreens = () => {
	return (
		<Navigator>
			<Screen name="Login" component={LoginScreen} />
			<Screen name="Signup" component={SignupSCreen} />
		</Navigator>
	);
};
