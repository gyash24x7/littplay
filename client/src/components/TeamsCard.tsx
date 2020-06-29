import {
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonCol,
	IonRow,
	IonText
} from "@ionic/react";
import React from "react";
import { Player } from "../generated";
import { DeepPartial } from "../generated/types";

interface TeamCardProps {
	teams: (string | undefined)[];
	players: (DeepPartial<Player> | undefined)[];
}

export const TeamsCard = ({ teams, players }: TeamCardProps) => {
	return (
		<IonRow>
			{teams?.map((team) => (
				<IonCol key={team} sizeMd="6" size="12">
					<IonCard className="game-play-card">
						<IonCardHeader>
							<IonCardSubtitle className="montserrat">Team</IonCardSubtitle>
							<IonCardTitle className="montserrat-bold">
								{team?.toUpperCase()}
							</IonCardTitle>
						</IonCardHeader>
						<IonCardContent>
							<IonRow style={{ justifyContent: "center" }}>
								<IonCol sizeLg="8" sizeMd="12" sizeSm="10" size="12">
									<div className="players-wrapper">
										{players
											.filter((player) => player?.team === team)
											.map((player) => player?.user!)
											.map((user) => (
												<div className="player-icon" key={user.id}>
													<img
														src={user.avatar}
														alt=""
														className="user-avatar"
													/>
													<IonText>{user.name}</IonText>
												</div>
											))}
									</div>
								</IonCol>
							</IonRow>
						</IonCardContent>
					</IonCard>
				</IonCol>
			))}
		</IonRow>
	);
};
