import {
	IonButton,
	IonContent,
	IonGrid,
	IonLoading,
	IonPage,
	IonText
} from "@ionic/react";
import React, { useState } from "react";
import { AppHeader } from "../components/AppHeader";
import { CreateGame } from "../components/CreateGame";
import { useCreateGameMutation } from "../generated";

export const GamePlayPage = () => {
	const [createGameVisible, setCreateGameVisible] = useState(false);
	const [gameCode, setGameCode] = useState("");

	const [createGame, { loading }] = useCreateGameMutation({
		onCompleted(data) {
			setGameCode(data.createGame);
			setCreateGameVisible(true);
		}
	});

	return (
		<IonPage>
			<AppHeader />
			<IonLoading isOpen={loading} />
			<IonContent>
				<IonGrid className="container">
					<IonButton className="app-button" onClick={() => createGame()}>
						Create Game
					</IonButton>
					<br />
					<IonText>OR</IonText>
					<br />
					<IonButton
						className="app-button"
						onClick={() => console.log("hello")}
					>
						Join Game
					</IonButton>
				</IonGrid>
				{createGameVisible && <CreateGame gameCode={gameCode} />}
			</IonContent>
		</IonPage>
	);
};
