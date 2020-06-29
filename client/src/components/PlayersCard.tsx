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
import { GetGameQuery } from "../generated";

interface PlayersCardProps {
	players: GetGameQuery["getGame"]["players"];
}

export const PlayersCard = ({ players }: PlayersCardProps) => {
	return (
		<IonRow>
			<IonCol>
				<IonCard className="game-play-card">
					<IonCardHeader>
						<IonCardTitle>PLAYERS</IonCardTitle>
					</IonCardHeader>
					<IonCardContent>
						<IonRow style={{ justifyContent: "center" }}>
							<IonCol
								sizeLg="4"
								sizeMd="8"
								size="12"
								className="players-wrapper"
							>
								{players.slice(0, 3).map(({ user }) => (
									<div className="player-icon" key={user.id}>
										<img src={user.avatar} alt="" className="user-avatar" />
										<IonText>{user.name}</IonText>
									</div>
								))}
							</IonCol>
							<IonCol
								sizeLg="4"
								sizeMd="8"
								size="12"
								className="players-wrapper"
							>
								{players.slice(3).map(({ user }) => (
									<div className="player-icon" key={user.id}>
										<img src={user.avatar} alt="" className="user-avatar" />
										<IonText>{user.name}</IonText>
									</div>
								))}
							</IonCol>
						</IonRow>
					</IonCardContent>
				</IonCard>
			</IonCol>
		</IonRow>
	);
};
