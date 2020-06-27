import { IonRouterOutlet } from "@ionic/react";
import React, { Fragment } from "react";
import { Redirect, Route } from "react-router";
import { AppHeader } from "../components/AppHeader";
import { AppMenu } from "../components/AppMenu";
import { GamePage } from "../pages/Game";
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
				<Route path="/game" component={NewGamePage} exact />
				<Route path="/game/:gameId" component={GamePage} exact />
				<Route path="/game/:gameId/play" exact component={GamePlayPage} />
				<Redirect to="/game" />
			</IonRouterOutlet>
			<AppMenu />
		</Fragment>
	);
};
