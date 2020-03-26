import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

import { LoadingScreen } from "../pages/Loading";

export const withProtection = (Component: any) => {
	if (localStorage.getItem("user")) {
		return Component;
	} else return LoadingScreen;
};

export const ProtectedRoute = (props: RouteProps) => {
	if (localStorage.getItem("user")) {
		return <Route {...props} />;
	} else return <Redirect to="/login" />;
};
