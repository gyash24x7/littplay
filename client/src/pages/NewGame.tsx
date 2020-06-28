import {
	IonButton,
	IonContent,
	IonGrid,
	IonLoading,
	IonPage,
	IonText
} from "@ionic/react";
import React from "react";
import { useHistory } from "react-router";
import { JoinGame } from "../components/JoinGame";
import { useCreateGameMutation } from "../generated";

export const NewGamePage = () => {
	const history = useHistory();
	const [createGame, { loading }] = useCreateGameMutation({
		onCompleted: (data) => history.push(`/game/${data.createGame}`)
	});

	return (
		<IonPage>
			<IonContent>
				<IonGrid className="container new-game">
					<JoinGame />
					<br />
					<IonText>OR</IonText>
					<br />
					<IonLoading isOpen={loading} />
					<IonButton className="app-button" onClick={() => createGame()}>
						Create Game
					</IonButton>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};
