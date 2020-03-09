import { Button } from "@ui-kitten/components";
import React from "react";
import { Text, View } from "react-native";

export const HomeScreen = ({ navigation }: any) => {
	return (
		<View>
			<Text>This is home screen</Text>
			<Button onPress={() => navigation.navigate("login")}>click me</Button>
		</View>
	);
};
