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
