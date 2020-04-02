import { GameCard } from "../utils/deck";

export interface Player {
	name: string;
	email: string;
	cards?: GameCard[];
	team?: string;
}

export interface Game {
	id: string;
	started: boolean;
	completed: boolean;
	currentMove: Move;
	deck: GameCard[];
	teams: Record<string, string[]>;
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

export interface UserActionPayload {
	name: string;
	email: string;
}

export interface UserAction {
	type: string;
	payload?: UserActionPayload;
}

export interface GameActionPayload {
	user: Player;
	from?: string;
	card?: GameCard;
}

export interface GameAction {
	type: string;
	payload: GameActionPayload;
}

export interface Store {
	game: Game;
	user: Player;
}
