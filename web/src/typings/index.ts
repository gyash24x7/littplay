import { GameCard } from "../utils/deck";

export interface User {
	displayName: string;
	email: string;
	phoneNumber?: string;
	photoUrl: string;
}

export interface Player {
	id: string;
	name: string;
	cards?: GameCard[];
}

export interface Game {
	started: boolean;
	completed: boolean;
	moves: string[];
	deck: string[];
	createdBy: string;
}
