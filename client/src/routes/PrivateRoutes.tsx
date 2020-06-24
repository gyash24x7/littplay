import {
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs
} from "@ionic/react";
import { ellipse, triangle } from "ionicons/icons";
import React from "react";

export const PrivateRoutes = () => {
	return (
		<IonTabs>
			<IonRouterOutlet></IonRouterOutlet>
			<IonTabBar slot="bottom">
				<IonTabButton tab="tab1" href="/tab1">
					<IonIcon icon={triangle} />
					<IonLabel>Tab 1</IonLabel>
				</IonTabButton>
				<IonTabButton tab="tab2" href="/tab2">
					<IonIcon icon={ellipse} />
					<IonLabel>Tab 2</IonLabel>
				</IonTabButton>
			</IonTabBar>
		</IonTabs>
	);
};
