
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum GameActivityType {
    PLAYER_JOINED = "PLAYER_JOINED",
    TEAMS_CREATED = "TEAMS_CREATED",
    GAME_STARTED = "GAME_STARTED"
}

export enum GameStatus {
    NOT_STARTED = "NOT_STARTED",
    TEAMS_CREATED = "TEAMS_CREATED",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"
}

export interface CreateTeamsInput {
    gameId: string;
    teams: string[];
}

export interface CreateUserInput {
    name: string;
    email: string;
    password: string;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface Game {
    id: string;
    code: string;
    playerCount: number;
    players: Player[];
    status: GameStatus;
    teams: string[];
    activity: GameActivity[];
}

export interface GameActivity {
    id: string;
    description: string;
    type: GameActivityType;
    game: Game;
}

export interface IMutation {
    createUser(data: CreateUserInput): string | Promise<string>;
    login(data: LoginInput): string | Promise<string>;
    createGame(): string | Promise<string>;
    joinGame(code: string): string | Promise<string>;
    createTeams(data: CreateTeamsInput): boolean | Promise<boolean>;
}

export interface Player {
    id: string;
    user: User;
    team: string;
    game: Game;
    hand: string[];
}

export interface IQuery {
    me(): User | Promise<User>;
    getGame(gameId: string): Game | Promise<Game>;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
}
