import Club from "../assets/club.png";
import Diamond from "../assets/diamond.png";
import Heart from "../assets/heart.png";
import Spade from "../assets/spade.png";

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

	constructor(shuffled: boolean = true) {
		if (shuffled) this.cards = shuffle(SORTED_DECK);
		else this.cards = SORTED_DECK;
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

export const getCardMap = (cards: GameCard[]) => {
	let cardRecord: Record<string, string[]> = {};

	cards.forEach((gameCard) => {
		if (!cardRecord[gameCard.set]) {
			cardRecord[gameCard.set] = [];
		}
		cardRecord[gameCard.set] = cards
			.filter(({ set }) => set === gameCard.set)
			.map((card) => card.getCardString());
	});

	return cardRecord;
};

export const getAskableCardMap = (hand: GameCard[]) => {
	let ownCardMapping = getCardMap(hand);
	let allCardMapping = getCardMap(
		new Deck(false).removeCardsOfRank("SEVEN").cards
	);

	Object.keys(ownCardMapping).forEach((set) => {
		ownCardMapping[set] = allCardMapping[set].filter(
			(card) => !ownCardMapping[set].includes(card)
		);
	});

	return ownCardMapping;
};

export const getCardColor = (card: GameCard) => {
	if (card.suit === "HEARTS" || card.suit === "DIAMONDS") {
		return "#DE350B";
	} else return "#141414";
};

export const getSuitIcon = ({ suit }: GameCard) => {
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

export const getRank = ({ rank }: GameCard) => {
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

export const getSortedHand = (hand: string[]) => {
	const sortedHand: GameCard[] = [];
	SORTED_DECK.forEach((gameCard) => {
		if (hand.includes(gameCard.getCardString())) sortedHand.push(gameCard);
	});
	return sortedHand;
};
