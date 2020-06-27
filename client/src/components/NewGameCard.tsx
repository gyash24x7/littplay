import {
	IonCard,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle
} from "@ionic/react";
import React from "react";

interface NewGameCardProps {
	gameCode: string;
	displayToast: () => void;
}

export const NewGameCard = ({ gameCode, displayToast }: NewGameCardProps) => {
	return (
		<IonCard className="game-play-card">
			<IonCardHeader>
				<IonCardSubtitle className="card-subtitle">
					Your Game Code is
				</IonCardSubtitle>
				<IonCardTitle
					className="game-code"
					onClick={() =>
						navigator.clipboard.writeText(gameCode).then(displayToast)
					}
				>
					{gameCode}
				</IonCardTitle>
				<IonCardSubtitle>(Click the code to copy)</IonCardSubtitle>
				<IonCardSubtitle>Share the code with other players</IonCardSubtitle>
			</IonCardHeader>
			<br />
		</IonCard>
	);
};
