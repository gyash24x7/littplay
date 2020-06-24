import { IonRouterOutlet } from "@ionic/react";
import React from "react";
import { Redirect, Route } from "react-router";
import { LoginPage } from "../pages/Login";
import { SignUpPage } from "../pages/Signup";

export const PublicRoutes = () => {
	return (
		<IonRouterOutlet>
			<Route path="/login" component={LoginPage} exact={true} />
			<Route path="/signup" component={SignUpPage} exact={true} />
			<Route path="/" render={() => <Redirect to="/login" />} exact={true} />
		</IonRouterOutlet>
	);
};
