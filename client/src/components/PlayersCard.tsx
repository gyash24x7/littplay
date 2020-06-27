import {
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle,
	IonCol,
	IonRow,
	IonText
} from "@ionic/react";
import React, { useState } from "react";
import { usePlayerJoinActivitySubscription, User } from "../generated";

interface PlayersCardProps {
	players: Partial<User>[];
	gameCode: string;
}

export const PlayersCard = ({ players, gameCode }: PlayersCardProps) => {
	const [playerData, setPlayerData] = useState(players);

	usePlayerJoinActivitySubscription({
		variables: { gameCode },
		onSubscriptionData({ subscriptionData: { data } }) {
			setPlayerData(data?.gameActivity.game.players || players);
		}
	});

	return (
		<IonCard className="game-play-card">
			<IonCardHeader>
				<IonCardTitle>PLAYERS {players.length}</IonCardTitle>
			</IonCardHeader>
			<IonCardContent>
				<IonRow>
					<IonCol className="players-wrapper">
						{playerData.map((player) => (
							<div className="player-icon" key={player.id}>
								<img src={player.avatar} alt="" className="user-avatar" />
								<IonText>{player.name}</IonText>
							</div>
						))}
					</IonCol>
				</IonRow>
			</IonCardContent>
		</IonCard>
	);
};
