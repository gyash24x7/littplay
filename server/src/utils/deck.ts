import { RANKS, SUITS } from ".";
import { GameCard } from "./gameCard";

export class Deck {
	cards: GameCard[];

	constructor() {
		this.cards = RANKS.flatMap((rank) =>
			SUITS.map((suit) => new GameCard(rank + "_OF_" + suit))
		);
	}

	shuffle() {
		let currentIndex = this.cards.length;
		let temporaryValue: GameCard;
		let randomIndex: number;

		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = this.cards[currentIndex];
			this.cards[currentIndex] = this.cards[randomIndex];
			this.cards[randomIndex] = temporaryValue;
		}
	}

	removeCardsOfRank(rank: string) {
		this.cards = this.cards.filter((card) => card.rank === rank);
	}

	generateHands(handCount: number) {
		let hands: GameCard[][] = [];
		let handSize = this.cards.length / handCount;

		for (let i = 0; i < handCount; i++) {
			hands[i].push(...this.cards.slice(i * handSize, (i + 1) * handSize));
		}

		return hands;
	}
}
