import { IonContent, IonGrid, IonPage, IonText } from "@ionic/react";
import React from "react";
import { AppHeader } from "../components/AppHeader";
import { CreateGame } from "../components/CreateGame";
import { JoinGame } from "../components/JoinGame";

export const GamePlayPage = () => {
	return (
		<IonPage>
			<AppHeader />
			<IonContent>
				<IonGrid className="container">
					<JoinGame withInput />
					<br />
					<IonText>OR</IonText>
					<br />
					<CreateGame />
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};
