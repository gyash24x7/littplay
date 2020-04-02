import { colors } from "@atlaskit/theme";

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
			return colors.R400;
		default:
			return colors.N900;
	}
};

export const SMALL_RANKS = RANKS.slice(0, 6);

export const BIG_RANKS = RANKS.slice(7);

export const getTeam = (
	email: string,
	teams: Record<string, string[]>,
	opposite: boolean = false
) => {
	const name = Object.keys(teams).find(teamName =>
		opposite
			? !teams[teamName].includes(email)
			: teams[teamName].includes(email)
	)!;
	return teams[name];
};

export const getTeamName = (
	email: string,
	teams: Record<string, string[]>,
	opposite: boolean = false
) =>
	Object.keys(teams).find(teamName =>
		opposite
			? !teams[teamName].includes(email)
			: teams[teamName].includes(email)
	)!;
