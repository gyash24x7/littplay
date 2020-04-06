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

// static getSetWiseCards(cards: GameCard[], validSuits: Set<string>) {
// 	const setWiseCards: { [key: string]: GameCard[] } = {};

// 	validSuits.forEach(suit => {
// 		setWiseCards[`Small ${suit}`] = cards.filter(
// 			card => suit === card.suit && SMALL_RANKS.includes(card.rank)
// 		);

// 		setWiseCards[`Big ${suit}`] = cards.filter(
// 			card => suit === card.suit && BIG_RANKS.includes(card.rank)
// 		);
// 	});

// 	return setWiseCards;
//

export const cardToString = ({ rank, suit }: GameCard) => `${rank} of ${suit}`;
