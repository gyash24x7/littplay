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
import { GetGameQuery } from "../generated";

interface TeamCardProps {
	teams: string[];
	players: GetGameQuery["getGame"]["players"];
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
								{team.toUpperCase()}
							</IonCardTitle>
						</IonCardHeader>
						<IonCardContent>
							<IonRow style={{ justifyContent: "center" }}>
								<IonCol sizeLg="8" sizeMd="12" sizeSm="10" size="12">
									<div className="players-wrapper">
										{players
											.filter((player) => player.team === team)
											.map(({ _id, avatar, name }) => (
												<div className="player-icon" key={_id}>
													<img src={avatar} alt="" className="user-avatar" />
													<IonText>{name}</IonText>
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
