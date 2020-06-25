import { IonButton, IonContent, IonGrid, IonPage, IonText } from "@ionic/react";
import React from "react";
import { AppHeader } from "../components/AppHeader";
import { CreateGameModal } from "../components/CreateGameModal";

export const GamePlayPage = () => {
	return (
		<IonPage>
			<AppHeader />
			<IonContent>
				<IonGrid className="container">
					<IonButton className="button">Create Game</IonButton>
					<br />
					<IonText>OR</IonText>
					<br />
					<IonButton className="button" onClick={() => console.log("hello")}>
						Join Game
					</IonButton>
				</IonGrid>
				<CreateGameModal />
			</IonContent>
		</IonPage>
	);
};
