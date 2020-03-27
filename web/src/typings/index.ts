import { Card } from "../utils/deck";

export interface User {
	displayName: string;
	email: string;
	phoneNumber?: string;
	photoUrl: string;
}

export interface Player {
	id: string;
	name: string;
	hand?: Card[];
}

export interface Game {
	started: boolean;
	completed: boolean;
	moves?: string[];
	deck: string[];
}
