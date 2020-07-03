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
import { GameCard, RANKS, SORTED_DECK } from "../utils/deck";

interface HandCardProps {
	player: GetGameQuery["getGame"]["players"][0];
}

export const HandCard = ({ player }: HandCardProps) => {
	const getCardColor = (card: GameCard) => {
		if (card.suit === "HEARTS" || card.suit === "DIAMONDS") {
			return "#DE350B";
		} else return "#141414";
	};

	const getSuitIcon = ({ suit }: GameCard) => {
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

	const getRank = ({ rank }: GameCard) => {
		const idx = RANKS.findIndex((RANK) => rank === RANK) + 1;
		switch (idx) {
			case 1:
				return "A";
			case 11:
				return "J";
			case 12:
				return "Q";
			case 13:
				return "K";
			default:
				return idx.toString();
		}
	};

	const getSortedHand = (hand: string[]) => {
		const sortedHand: GameCard[] = [];
		SORTED_DECK.forEach((gameCard) => {
			if (hand.includes(gameCard.getCardString())) sortedHand.push(gameCard);
		});
		return sortedHand;
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
							{getSortedHand(player.hand).map((gameCard) => (
								<div className="game-card" key={gameCard.getCardString()}>
									<img
										src={getSuitIcon(gameCard)}
										alt=""
										className="card-suit"
									/>
									<div
										className="card-rank"
										style={{ color: getCardColor(gameCard) }}
									>
										{getRank(gameCard)}
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
