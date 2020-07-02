export function shuffle<T>(array: T[]) {
	let arr = [...array];
	for (let i = arr.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

export class GameCard {
	rank: string;
	suit: string;
	set: string;

	constructor(cardString: string) {
		this.rank = cardString.split(" OF ")[0];
		this.suit = cardString.split(" OF ")[1];
		this.set =
			RANKS.indexOf(this.rank) > 5 ? `BIG ${this.suit}` : `SMALL ${this.suit}`;
	}

	getCardString() {
		return this.rank + " OF " + this.suit;
	}
}

export class Deck {
	cards: GameCard[] = [];

	constructor() {
		this.cards = shuffle(
			RANKS.flatMap((rank) =>
				SUITS.map((suit) => new GameCard(rank + " OF " + suit))
			)
		);
	}

	removeCardsOfRank(rank: string) {
		this.cards = this.cards.filter((card) => card.rank !== rank);
	}

	generateHands(handCount: number) {
		const handSize = this.cards.length / handCount;
		return [...Array(handCount)].map((_, i) =>
			this.cards.slice(handSize * i, handSize * (i + 1))
		);
	}
}

export const SUITS = ["HEARTS", "SPADES", "CLUBS", "DIAMONDS"];

export const RANKS = [
	"ACE",
	"TWO",
	"THREE",
	"FOUR",
	"FIVE",
	"SIX",
	"EIGHT",
	"NINE",
	"TEN",
	"JACK",
	"QUEEN",
	"KING"
];

export const SORTED_DECK = SUITS.flatMap((suit) =>
	RANKS.map((rank) => new GameCard(rank + " OF " + suit))
).map((card) => card.getCardString());

export const SETS = [
	"SMALL HEARTS",
	"SMALL CLUBS",
	"SMALL SPADES",
	"SMALL DIAMONDS",
	"BIG DIAMONDS",
	"BIG CLUBS",
	"BIG SPADES",
	"BIG HEARTS"
];

export const getHandRecord = (hand: GameCard[]) => {
	const handRecord: Record<string, Set<string>> = {};

	hand.forEach((card) => {
		if (!handRecord[card.set]) {
			handRecord[card.set] = new Set<string>();
		}

		SORTED_DECK.map((card) => new GameCard(card))
			.filter(({ rank, set }) => rank !== card.rank && set === card.set)
			.map((card) => card.getCardString())
			.forEach((cardString) => handRecord[card.set].add(cardString));
	});

	return handRecord;
};
