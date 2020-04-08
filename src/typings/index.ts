export interface GameCard {
	rank: string;
	suit: string;
	set: string;
}

export interface Team {
	score: number;
	members: string[];
}

export interface Game {
	started: boolean;
	completed: boolean;
	players: Record<string, GameCard[]>;
	deck: GameCard[];
	teams: Record<string, Team>;
	createdBy: string;
	currentMove: string;
	askData?: {
		askedBy: string;
		askedFrom: string;
		askedFor: GameCard;
	};
	turn?: string;
	callData?: {
		calledBy: string;
		calledSet: string;
		status: string;
	};
}

export interface User {
	name: string;
	email: string;
}
