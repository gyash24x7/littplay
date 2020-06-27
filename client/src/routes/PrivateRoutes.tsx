import { IonRouterOutlet } from "@ionic/react";
import React, { Fragment } from "react";
import { Redirect, Route } from "react-router";
import { AppHeader } from "../components/AppHeader";
import { AppMenu } from "../components/AppMenu";
import { GamePlayPage } from "../pages/GamePlay";
import { NewGamePage } from "../pages/NewGame";
import { ProfilePage } from "../pages/Profile";
import { RulesPage } from "../pages/Rules";

export const PrivateRoutes = () => {
	return (
		<Fragment>
			<AppHeader />
			<IonRouterOutlet id="appRouter">
				<Route path="/profile" component={ProfilePage} exact />
				<Route path="/rules" component={RulesPage} exact />
				<Route path="/play" component={NewGamePage} exact />
				<Route path="/play/:gameId" component={GamePlayPage} exact />
				<Redirect to="/play" />
			</IonRouterOutlet>
			<AppMenu />
		</Fragment>
	);
};
