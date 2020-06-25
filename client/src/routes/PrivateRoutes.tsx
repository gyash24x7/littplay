import {
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs
} from "@ionic/react";
import { ellipse } from "ionicons/icons";
import React from "react";
import { Redirect, Route } from "react-router";
import { GamePlayPage } from "../pages/GamePlay";
import { ProfilePage } from "../pages/Profile";
import { RulesPage } from "../pages/Rules";

export const PrivateRoutes = () => {
	return (
		<IonTabs>
			<IonRouterOutlet>
				<Route path="/profile" component={ProfilePage} />
				<Route path="/rules" component={RulesPage} />
				<Route path="/play" component={GamePlayPage} />
				<Redirect to="/play" />
			</IonRouterOutlet>
			<IonTabBar slot="bottom">
				<IonTabButton tab="play" href="/play">
					<IonIcon icon={ellipse} />
					<IonLabel>Play</IonLabel>
				</IonTabButton>
				<IonTabButton tab="profile" href="/profile">
					<IonIcon icon={ellipse} />
					<IonLabel>Profile</IonLabel>
				</IonTabButton>
				<IonTabButton tab="rules" href="/rules">
					<IonIcon icon={ellipse} />
					<IonLabel>Rules</IonLabel>
				</IonTabButton>
			</IonTabBar>
		</IonTabs>
	);
};
