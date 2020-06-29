import {
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle,
	IonCol,
	IonRow
} from "@ionic/react";
import React from "react";
import Club from "../assets/club.png";
import Diamond from "../assets/diamond.png";
import Heart from "../assets/heart.png";
import Spade from "../assets/spade.png";
import { GetGameQuery } from "../generated";
import { GameCard } from "../utils/deck";

interface HandCardProps {
	player: GetGameQuery["getGame"]["players"][0];
}

export const HandCard = ({ player }: HandCardProps) => {
	const getCardColor = (card: GameCard) => {
		if (card.suit === "HEARTS" || card.suit === "DIAMONDS") {
			return "#DE350B";
		} else return "#141414";
	};

	const getSuitIcon = (suit: string) => {
		switch (suit) {
			case "SPADES":
				return Spade;
			case "CLUBS":
				return Club;
			case "HEARTS":
				return Heart;
			default:
				return Diamond;
		}
	};

	return (
		<IonRow>
			<IonCol>
				<IonCard className="game-play-card">
					<IonCardHeader>
						<IonCardTitle>MY HAND</IonCardTitle>
					</IonCardHeader>
					<IonCardContent>
						<div className="game-cards-wrapper">
							{player.hand
								.map((cardString) => new GameCard(cardString))
								.map((gameCard) => (
									<div className="game-card" key={gameCard.getCardString()}>
										<img
											src={getSuitIcon(gameCard.suit)}
											alt=""
											className="card-suit"
										/>
										<div
											className="card-rank"
											style={{ color: getCardColor(gameCard) }}
										>
											A
										</div>
									</div>
								))}
						</div>
					</IonCardContent>
				</IonCard>
			</IonCol>
		</IonRow>
	);
};
