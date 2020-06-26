import { IonRouterOutlet } from "@ionic/react";
import React, { Fragment } from "react";
import { Redirect, Route } from "react-router";
import { AppHeader } from "../components/AppHeader";
import { AppMenu } from "../components/AppMenu";
import { GamePlayPage } from "../pages/GamePlay";
import { ProfilePage } from "../pages/Profile";
import { RulesPage } from "../pages/Rules";

export const PrivateRoutes = () => {
	return (
		<Fragment>
			<AppHeader />
			<IonRouterOutlet id="appRouter">
				<Route path="/profile" component={ProfilePage} />
				<Route path="/rules" component={RulesPage} />
				<Route path="/play" component={GamePlayPage} />
				<Redirect to="/play" />
			</IonRouterOutlet>
			<AppMenu />
		</Fragment>
	);
};
