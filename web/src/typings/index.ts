import { GameCard } from "../utils/deck";

export interface Player {
	name: string;
	email: string;
	cards?: GameCard[];
}

export interface Game {
	started: boolean;
	completed: boolean;
	currentMove: Move;
	deck: GameCard[];
	teams: Record<string, Player>[];
	createdBy: string;
	players: Player[];
}

export interface Move {
	type: string;
	from?: string;
	by?: string;
	card?: GameCard;
	turn?: string;
}
