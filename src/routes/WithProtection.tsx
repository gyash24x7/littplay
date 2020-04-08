import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

export const ProtectedRoute = (props: RouteProps) => {
	if (localStorage.getItem("user")) {
		return <Route {...props} />;
	} else return <Redirect to="/login" />;
};
