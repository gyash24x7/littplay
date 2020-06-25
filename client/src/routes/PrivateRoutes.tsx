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
import { Route } from "react-router";
import { ProfilePage } from "../pages/Profile";

export const PrivateRoutes = () => {
	return (
		<IonTabs>
			<IonRouterOutlet>
				<Route path="/profile" component={ProfilePage} />
			</IonRouterOutlet>
			<IonTabBar slot="bottom">
				<IonTabButton tab="profile" href="/profile">
					<IonIcon icon={ellipse} />
					<IonLabel>Profile</IonLabel>
				</IonTabButton>
			</IonTabBar>
		</IonTabs>
	);
};
