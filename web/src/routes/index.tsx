import React from "react";
import { hot } from "react-hot-loader/root";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { GameScreen } from "../pages/Game";
import { HomeScreen } from "../pages/Home";
import { LoginScreen } from "../pages/Login";
import { ProtectedRoute } from "./WithProtection";

export const AppRoutes = hot(() => {
	return (
		<BrowserRouter>
			<Switch>
				<ProtectedRoute path="/" exact component={HomeScreen} />
				<ProtectedRoute path="/play/:gameId" exact component={GameScreen} />
				<Route path="/login" exact component={LoginScreen} />
			</Switch>
		</BrowserRouter>
	);
});
