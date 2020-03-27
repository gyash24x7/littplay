import { RANKS, SUITS } from "./constants";

export class Card {
	rank: string;
	suit: string;

	constructor({ rank, suit }: { rank: string; suit: string }) {
		this.suit = suit;
		this.rank = rank;
	}

	toString() {
		return `${this.rank} of ${this.suit}`;
	}
}

export class Deck {
	cards: Card[] = [];

	constructor() {
		this.cards = RANKS.flatMap(rank =>
			SUITS.map(suit => new Card({ suit, rank }))
		);

		this.shuffle();
	}

	shuffle() {
		var currentIndex = this.cards.length,
			temporaryValue,
			randomIndex;

		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = this.cards[currentIndex];
			this.cards[currentIndex] = this.cards[randomIndex];
			this.cards[randomIndex] = temporaryValue;
		}
	}

	removeCardsOfRank(rank: string) {
		this.cards = this.cards.filter(card => card.rank !== rank);
	}
}
