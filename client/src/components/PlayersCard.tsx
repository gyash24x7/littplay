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
import { Player } from "../generated";
import { DeepPartial } from "../generated/types";

interface PlayersCardProps {
	players: DeepPartial<Player>[];
	gameCode: string;
}

export const PlayersCard = ({ players }: PlayersCardProps) => {
	return (
		<IonCard className="game-play-card">
			<IonCardHeader>
				<IonCardTitle>PLAYERS</IonCardTitle>
			</IonCardHeader>
			<IonCardContent>
				<IonRow>
					<IonCol className="players-wrapper">
						{players
							.map((player) => player.user!)
							.map((user) => (
								<div className="player-icon" key={user.id}>
									<img src={user.avatar} alt="" className="user-avatar" />
									<IonText>{user.name}</IonText>
								</div>
							))}
					</IonCol>
				</IonRow>
			</IonCardContent>
		</IonCard>
	);
};
