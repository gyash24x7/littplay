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

interface TeamCardProps {
	team: string;
	players: (DeepPartial<Player> | undefined)[];
}

export const TeamCard = ({ team, players }: TeamCardProps) => {
	return (
		<IonCard className="game-play-card">
			<IonCardHeader>
				<IonCardTitle>Team {team.toUpperCase()}</IonCardTitle>
			</IonCardHeader>
			<IonCardContent>
				<IonRow style={{ justifyContent: "center" }}>
					<IonCol sizeLg="8" sizeMd="12" sizeSm="8" size="12">
						<div className="players-wrapper">
							{players
								.map((player) => player?.user!)
								.map((user) => (
									<div className="player-icon" key={user.id}>
										<img src={user.avatar} alt="" className="user-avatar" />
										<IonText>{user.name}</IonText>
									</div>
								))}
						</div>
					</IonCol>
				</IonRow>
			</IonCardContent>
		</IonCard>
	);
};
