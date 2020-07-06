import {
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle
} from "@ionic/react";
import React from "react";
import { GetGameQuery } from "../generated";
import {
	getCardColor,
	getRank,
	getSortedHand,
	getSuitIcon
} from "../utils/deck";

interface HandCardProps {
	player: GetGameQuery["getGame"]["players"][0];
}

export const HandCard = ({ player }: HandCardProps) => {
	return (
		<IonCard className="game-play-card">
			<IonCardHeader>
				<IonCardTitle>MY HAND</IonCardTitle>
			</IonCardHeader>
			<IonCardContent>
				<div className="flex-container">
					{getSortedHand(player.hand).map((gameCard) => (
						<div className="game-card" key={gameCard.getCardString()}>
							<img src={getSuitIcon(gameCard)} alt="" className="card-suit" />
							<div
								className="card-rank"
								style={{ color: getCardColor(gameCard) }}
							>
								{getRank(gameCard)}
							</div>
						</div>
					))}
					{player.hand.length === 0 && (
						<IonCardSubtitle>NO CARDS LEFT</IonCardSubtitle>
					)}
				</div>
			</IonCardContent>
		</IonCard>
	);
};
