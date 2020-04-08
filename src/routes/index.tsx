import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React from "react";
import { Route } from "react-router-dom";

import { GameScreen } from "../pages/Game";
import { HomeScreen } from "../pages/Home";
import { LoginScreen } from "../pages/Login";
import { ProtectedRoute } from "./WithProtection";

export const AppRoutes = () => {
	return (
		<IonReactRouter>
			<IonRouterOutlet>
				<ProtectedRoute path="/" exact component={HomeScreen} />
				<ProtectedRoute path="/play/:gameId" exact component={GameScreen} />
				<Route path="/login" exact component={LoginScreen} />
			</IonRouterOutlet>
		</IonReactRouter>
	);
};
