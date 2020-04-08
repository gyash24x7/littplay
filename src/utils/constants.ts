import Clubs from "../assets/club.png";
import Diamonds from "../assets/diamond.png";
import Hearts from "../assets/heart.png";
import Spades from "../assets/spade.png";
import { GameCard, Team } from "../typings";

export const RANKS: Record<string, string> = {
	Ace: "A",
	Two: "2",
	Three: "3",
	Four: "4",
	Five: "5",
	Six: "6",
	Seven: "7",
	Eight: "8",
	Nine: "9",
	Ten: "10",
	Jack: "J",
	Queen: "Q",
	King: "K"
};

export const SUITS: Record<string, any> = { Hearts, Clubs, Spades, Diamonds };

export const getTeamName = (
	name: string,
	teams: Record<string, Team>,
	opposite: boolean = false
) =>
	Object.keys(teams).find((teamName) =>
		opposite
			? !teams[teamName].members.includes(name)
			: teams[teamName].members.includes(name)
	)!;

export const sortedDeck: GameCard[] = Object.keys(SUITS).flatMap((suit) =>
	Object.keys(RANKS).map((rank, index) => ({
		rank,
		suit,
		set: index > 6 ? "Big " + suit : "Small " + suit
	}))
);

export const getSortedHand = (hand: GameCard[]) => {
	let cards: GameCard[] = [];
	sortedDeck.forEach((card) => {
		let i = hand.findIndex(
			({ rank, suit }) => card.rank === rank && card.suit === suit
		);
		if (i >= 0) cards.push(card);
	});

	return cards;
};
