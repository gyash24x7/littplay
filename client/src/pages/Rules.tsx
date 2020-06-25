import { IonContent, IonGrid, IonPage } from "@ionic/react";
import React from "react";
import { AppHeader } from "../components/AppHeader";

export const RulesPage = () => {
	return (
		<IonPage>
			<AppHeader />
			<IonContent>
				<IonGrid className="container">rules Page</IonGrid>
			</IonContent>
		</IonPage>
	);
};
