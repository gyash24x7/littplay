import {
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
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
				<IonCardSubtitle className="card-subtitle">Players</IonCardSubtitle>
			</IonCardHeader>
			<IonCardContent>
				<div className="players-wrapper">
					{players.map((player) => (
						<div key={player.id} className="player-icon">
							<img src={player.avatar} alt="" className="user-avatar" />
							<IonText>{player.name}</IonText>
						</div>
					))}
				</div>
			</IonCardContent>
		</IonCard>
	);
};
