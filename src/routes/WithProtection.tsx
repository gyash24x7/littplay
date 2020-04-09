import React, { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

import { UserContext } from "../utils/context";

export const ProtectedRoute = (props: RouteProps) => {
	const { user } = useContext(UserContext);

	if (user.loggedIn) {
		return <Route {...props} />;
	} else return <Redirect to="/login" />;
};
