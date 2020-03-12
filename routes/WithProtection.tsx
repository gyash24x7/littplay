import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

import { LoadingScreen } from "../screens/Loading";
import { appState } from "../store";

export const withProtection = (Component: any) => {
	if (appState.loggedIn) {
		return Component;
	} else return LoadingScreen;
};

export const ProtectedRoute = (props: RouteProps) => {
	if (appState.loggedIn) {
		return <Route {...props} />;
	} else return <Redirect to="/login" />;
};
