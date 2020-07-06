import {
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle,
	IonCol,
	IonRow,
	IonText
} from "@ionic/react";
import React, { useContext } from "react";
import { GameContext } from "../utils/context";

export const PlayersCard = () => {
	const { players } = useContext(GameContext)!;
	return (
		<IonCard className="game-play-card">
			<IonCardHeader>
				<IonCardTitle>PLAYERS</IonCardTitle>
			</IonCardHeader>
			<IonCardContent>
				<IonRow style={{ justifyContent: "center" }}>
					<IonCol sizeLg="4" sizeMd="8" size="12" className="players-wrapper">
						{players.slice(0, 3).map(({ _id, avatar, name }) => (
							<div className="player-icon" key={_id}>
								<img src={avatar} alt="" className="user-avatar" />
								<IonText>{name}</IonText>
							</div>
						))}
					</IonCol>
					<IonCol sizeLg="4" sizeMd="8" size="12" className="players-wrapper">
						{players.slice(3).map(({ _id, avatar, name }) => (
							<div className="player-icon" key={_id}>
								<img src={avatar} alt="" className="user-avatar" />
								<IonText>{name}</IonText>
							</div>
						))}
					</IonCol>
				</IonRow>
			</IonCardContent>
		</IonCard>
	);
};
