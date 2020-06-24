import { GameCard } from "./gameCard";

export class Hand {
	cards: GameCard[];

	constructor(cardStrings: string[]) {
		this.cards = cardStrings.map((cardString) => new GameCard(cardString));
	}

	hasCard({ rank, suit }: GameCard) {
		const index = this.cards.findIndex(
			(card) => card.rank === rank && card.suit === suit
		);

		return index > -1;
	}
}
