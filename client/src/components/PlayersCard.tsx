import {
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle,
	IonCol,
	IonRow,
	IonText
} from "@ionic/react";
import React from "react";
import { User } from "../generated";

interface PlayersCardProps {
	players: Partial<User>[];
}

export const PlayersCard = ({ players }: PlayersCardProps) => {
	return (
		<IonCard className="game-play-card">
			<IonCardHeader>
				<IonCardTitle>PLAYERS</IonCardTitle>
			</IonCardHeader>
			<IonCardContent>
				<IonRow>
					{players.map((player) => (
						<IonCol className="player-icon" key={player.id}>
							<img src={player.avatar} alt="" className="user-avatar" />
							<IonText>{player.name}</IonText>
						</IonCol>
					))}
				</IonRow>
			</IonCardContent>
		</IonCard>
	);
};
