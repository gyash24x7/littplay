import { RANKS, SUITS } from "./constants";

export class GameCard {
	rank: string;
	suit: string;

	constructor({ rank, suit }: { rank: string; suit: string }) {
		this.suit = suit;
		this.rank = rank;
	}

	toString() {
		return `${this.rank} of ${this.suit}`;
	}

	static fromString(cardString: string) {
		const rank = cardString.split(" of ")[0];
		const suit = cardString.split(" of ")[1];
		return new GameCard({ rank, suit });
	}
}

export class Deck {
	cards: GameCard[] = [];

	constructor() {
		this.cards = RANKS.flatMap(rank =>
			SUITS.map(suit => new GameCard({ suit, rank }))
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
