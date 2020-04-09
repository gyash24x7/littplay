import { GameCard } from "../typings";

export const shuffleCards = (cards: GameCard[]) => {
	var currentIndex = cards.length,
		temporaryValue,
		randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		temporaryValue = cards[currentIndex];
		cards[currentIndex] = cards[randomIndex];
		cards[randomIndex] = temporaryValue;
	}
	return cards;
};

export const removeCardsOfRank = (rank: string, cards: GameCard[]) => {
	return cards.filter((card) => card.rank !== rank);
};

export const cardToString = ({ rank, suit }: GameCard) => `${rank} of ${suit}`;

export const getHaveCards = (
	array: GameCard[],
	{ rank, suit }: GameCard = { rank: "", suit: "", set: "" }
) => {
	return (
		array.findIndex((card) => {
			return card.suit === suit && card.rank === rank;
		}) > -1
	);
};
