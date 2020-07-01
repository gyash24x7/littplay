import { shuffle } from ".";

export class GameCard {
	rank: string;
	suit: string;

	constructor(cardString: string) {
		this.rank = cardString.split(" OF ")[0];
		this.suit = cardString.split(" OF ")[1];
	}

	getCardString() {
		return this.rank + " OF " + this.suit;
	}
}

export class Deck {
	cards: GameCard[] = [];

	constructor() {
		this.cards = shuffle(SORTED_DECK);
	}

	static handContains(hand: GameCard[], card: GameCard) {
		const foundCard = hand.find(
			({ rank, suit }) => card.rank === rank && card.suit === suit
		);
		return !!foundCard;
	}

	static sortHand(hand: GameCard[]) {
		let sortedHand: GameCard[] = [];
		SORTED_DECK.forEach((card) => {
			if (Deck.handContains(hand, card)) sortedHand.push(card);
		});
		return sortedHand;
	}

	removeCardsOfRank(rank: string) {
		this.cards = this.cards.filter((card) => card.rank !== rank);
		return this;
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
	"SEVEN",
	"EIGHT",
	"NINE",
	"TEN",
	"JACK",
	"QUEEN",
	"KING"
];

export const SORTED_DECK = SUITS.flatMap((suit) =>
	RANKS.map((rank) => new GameCard(rank + " OF " + suit))
);
