import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import { AsyncStorage } from "react-native";
import { AuthContext } from "../utils/context";
import { PrivateScreens } from "./PrivateScreens";
import { PublicScreens } from "./PublicScreens";

export const AppNavigation = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const getTokensAsync = async () => {
			let authToken = await AsyncStorage.getItem("authToken");
			setIsAuthenticated(!!authToken);
		};

		getTokensAsync();
	}, []);

	const authContext = useMemo(() => ({ setIsAuthenticated }), []);

	return (
		<NavigationContainer>
			<AuthContext.Provider value={authContext}>
				{isAuthenticated ? <PrivateScreens /> : <PublicScreens />}
			</AuthContext.Provider>
		</NavigationContainer>
	);
};
