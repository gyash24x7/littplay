import { useFonts } from "@use-expo/font";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, AsyncStorage } from "react-native";
import ErrorBoundary from "react-native-error-boundary";
import { Provider } from "react-native-paper";

import { AppRoutes } from "./routes";
import { User } from "./typings";
import { UserContext } from "./utils/context";
import { theme } from "./utils/theme";

export default () => {
	const [fontLoaded] = useFonts({
		"montserrat-bold": require("./assets/fonts/montserrat-bold.ttf"),
		"montserrat-regular": require("./assets/fonts/montserrat-regular.ttf"),
		"montserrat-light": require("./assets/fonts/montserrat-light.ttf")
	});

	const [user, setUser] = useState({} as User);

	useEffect(() => {
		const getUser = async () => {
			let userString = await AsyncStorage.getItem("user");
			setUser(userString ? JSON.parse(userString) : {});
		};

		getUser();
	});

	if (!fontLoaded) return <ActivityIndicator />;

	return (
		<ErrorBoundary>
			<UserContext.Provider value={{ user, setUser }}>
				<Provider theme={theme}>
					<AppRoutes />
				</Provider>
			</UserContext.Provider>
		</ErrorBoundary>
	);
};
