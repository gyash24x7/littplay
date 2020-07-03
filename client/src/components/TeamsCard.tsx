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
import React, { useContext } from "react";
import { GameContext } from "../utils/context";

export const TeamsCard = () => {
	const { teams, players } = useContext(GameContext)!;
	return (
		<IonRow>
			{teams?.map((team) => (
				<IonCol key={team.name} sizeMd="6" size="12">
					<IonCard className="game-play-card">
						<IonCardHeader>
							<IonCardSubtitle className="montserrat">Team</IonCardSubtitle>
							<IonCardTitle className="montserrat-bold">
								{team.name.toUpperCase()}
							</IonCardTitle>
						</IonCardHeader>
						<IonCardContent>
							<IonRow style={{ justifyContent: "center" }}>
								<IonCol sizeLg="8" sizeMd="12" sizeSm="10" size="12">
									<div className="players-wrapper">
										{players
											.filter((player) => player.team === team.name)
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
