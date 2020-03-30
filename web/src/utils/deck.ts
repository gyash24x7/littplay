import { BIG_RANKS, RANKS, SMALL_RANKS, SUITS } from "./constants";

export class GameCard {
	rank: string;
	suit: string;

	constructor({ rank, suit }: { rank: string; suit: string }) {
		this.suit = suit;
		this.rank = rank;
	}

	static toMap({ rank, suit }: GameCard) {
		return { rank, suit };
	}

	static toString({ rank, suit }: GameCard) {
		return `${rank} of ${suit}`;
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

	static getSetWiseCards(cards: GameCard[], validSuits: Set<string>) {
		const setWiseCards: { [key: string]: GameCard[] } = {};

		validSuits.forEach(suit => {
			setWiseCards[`Small ${suit}`] = cards.filter(
				card => suit === card.suit && SMALL_RANKS.includes(card.rank)
			);

			setWiseCards[`Big ${suit}`] = cards.filter(
				card => suit === card.suit && BIG_RANKS.includes(card.rank)
			);
		});

		return setWiseCards;
	}

	// static getSetWiseCallableCards( setWiseCards: { [ key: string ]: GameCard[]; } ) {

	// }
}
