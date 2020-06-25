import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonToast
} from "@ionic/react";
import React, { useState } from "react";

interface CreateGameProps {
	gameCode: string;
}

export const CreateGame = ({ gameCode }: CreateGameProps) => {
	const [isToastVisible, setIsToastVisible] = useState(false);
	return (
		<div className="backdrop">
			<IonCard className="modal-card">
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
					<IonCardSubtitle>Share the code with other players</IonCardSubtitle>
				</IonCardHeader>
				<IonCardContent>
					<IonButton className="app-button">Join Game</IonButton>
				</IonCardContent>
			</IonCard>
			<IonToast
				isOpen={isToastVisible}
				duration={1000}
				onDidDismiss={() => setIsToastVisible(false)}
				message="Game Code copied to clipboard!"
			/>
		</div>
	);
};
