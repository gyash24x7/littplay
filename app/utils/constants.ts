export const RANKS = [
	"Ace",
	"Two",
	"Three",
	"Four",
	"Five",
	"Six",
	"Seven",
	"Eight",
	"Nine",
	"Ten",
	"Jack",
	"Queen",
	"King"
];

export const SUITS = ["Hearts", "Clubs", "Spades", "Diamonds"];

export const getCardColor = (suit: string) => {
	switch (suit) {
		case "Hearts":
		case "Diamonds":
			return "#de350b";
		default:
			return "#172b4d";
	}
};

export const SMALL_RANKS = RANKS.slice(0, 6);

export const BIG_RANKS = RANKS.slice(7);
