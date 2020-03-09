import "react-native-gesture-handler";

import { createBrowserApp } from "@react-navigation/web";
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { HomeScreen } from "../screens/Home";
import { LoginScreen } from "../screens/Login";

const AppNavigator = createStackNavigator(
	{ home: HomeScreen, login: LoginScreen },
	{ initialRouteName: "Login", headerMode: "none" }
);

export default Platform.OS === "web"
	? createBrowserApp(AppNavigator)
	: createAppContainer(AppNavigator);
