import {
	IonButton,
	IonCard,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonCol,
	IonRow
} from "@ionic/react";
import React from "react";

interface NewGameCardProps {
	gameCode: string;
	displayToast: () => void;
}

export const NewGameCard = ({ gameCode, displayToast }: NewGameCardProps) => {
	const copyCode = () =>
		navigator.clipboard.writeText(gameCode).then(displayToast);

	return (
		<IonRow>
			<IonCol>
				<IonCard className="game-play-card">
					<IonCardHeader>
						<IonCardSubtitle className="card-subtitle">
							Your Game Code is
						</IonCardSubtitle>
						<IonCardTitle className="game-code">{gameCode}</IonCardTitle>
						<IonCardSubtitle>Share the code with other players</IonCardSubtitle>
						<br />
						<IonButton color="dark" size="small" onClick={copyCode}>
							Copy Code
						</IonButton>
					</IonCardHeader>
					<br />
				</IonCard>
			</IonCol>
		</IonRow>
	);
};
