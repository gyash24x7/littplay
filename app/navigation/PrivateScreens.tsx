import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { ShowError } from "../components/ShowError";
import { useMeQuery } from "../generated";
import { GameScreen } from "../screens/Game";
import { NewGameScreen } from "../screens/NewGame";
import { ProfileScreen } from "../screens/Profile";
import { UserContext } from "../utils/context";
import { LoadingScreen } from "./LoadingScreen";

const { Navigator, Screen } = createDrawerNavigator();

export const PrivateScreens = () => {
	const { data, error } = useMeQuery();

	if (error) return <ShowError />;

	if (data?.me) {
		return (
			<UserContext.Provider value={data.me}>
				<Navigator>
					<Screen name="NewGame" component={NewGameScreen} />
					<Screen name="Game" component={GameScreen} />
					<Screen name="Profile" component={ProfileScreen} />
				</Navigator>
			</UserContext.Provider>
		);
	}

	return <LoadingScreen />;
};
