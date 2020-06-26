import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonLoading,
	IonModal,
	IonText,
	IonToast
} from "@ionic/react";
import React, { Fragment, useState } from "react";
import { useCreateGameMutation } from "../generated";
import { JoinGame } from "./JoinGame";

export const CreateGame = () => {
	const [isToastVisible, setIsToastVisible] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [gameCode, setGameCode] = useState("");

	const [createGame, { loading }] = useCreateGameMutation({
		onCompleted(data) {
			setGameCode(data.createGame.gameCode);
			setIsModalVisible(true);
		}
	});

	return (
		<Fragment>
			<IonLoading isOpen={loading} />
			<IonButton className="app-button" onClick={() => createGame()}>
				Create Game
			</IonButton>
			<IonModal
				isOpen={isModalVisible}
				animated
				backdropDismiss
				cssClass="app-modal"
			>
				<div className="container">
					<IonCard className="modal-card">
						<IonCardContent>
							<IonCardHeader>
								<IonCardSubtitle className="card-subtitle">
									Your Game Code is
								</IonCardSubtitle>
								<IonCardTitle
									className="game-code"
									onClick={() =>
										navigator.clipboard
											.writeText(gameCode)
											.then(() => setIsToastVisible(true))
									}
								>
									{gameCode}
								</IonCardTitle>
								<IonCardSubtitle>
									Share the code with other players
								</IonCardSubtitle>
							</IonCardHeader>
							<JoinGame gameCode={gameCode} />
							<IonButton fill="clear" onClick={() => setIsModalVisible(false)}>
								<IonText>Close</IonText>
							</IonButton>
						</IonCardContent>
						<br />
					</IonCard>
				</div>
			</IonModal>
			<IonToast
				isOpen={isToastVisible}
				duration={1000}
				onDidDismiss={() => setIsToastVisible(false)}
				message="Game Code copied to clipboard!"
			/>
		</Fragment>
	);
};
