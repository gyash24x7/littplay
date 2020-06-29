
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum GameActivityType {
    PLAYER_JOINED = "PLAYER_JOINED",
    TEAMS_CREATED = "TEAMS_CREATED",
    GAME_STARTED = "GAME_STARTED",
    ASK_CARD = "ASK_CARD",
    GIVE_CARD = "GIVE_CARD",
    DECLINE_CARD = "DECLINE_CARD",
    CALL_SET = "CALL_SET"
}

export enum GameStatus {
    NOT_STARTED = "NOT_STARTED",
    PLAYERS_READY = "PLAYERS_READY",
    TEAMS_CREATED = "TEAMS_CREATED",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"
}

export class CreateTeamsInput {
    gameId: string;
    teams: string[];
}

export class CreateUserInput {
    name: string;
    email: string;
    password: string;
}

export class LoginInput {
    email: string;
    password: string;
}

export class Game {
    id: string;
    code: string;
    playerCount: number;
    players: Player[];
    status: GameStatus;
    teams: string[];
    activity: GameActivity[];
    createdBy: User;
}

export class GameActivity {
    id: string;
    description: string;
    type: GameActivityType;
    game: Game;
    data: string;
}

export abstract class IMutation {
    abstract createUser(data: CreateUserInput): string | Promise<string>;

    abstract login(data: LoginInput): string | Promise<string>;

    abstract createGame(): string | Promise<string>;

    abstract joinGame(code: string): string | Promise<string>;

    abstract createTeams(data: CreateTeamsInput): boolean | Promise<boolean>;

    abstract startGame(gameId: string): boolean | Promise<boolean>;
}

export class Player {
    id: string;
    user: User;
    team: string;
    game: Game;
    hand: string[];
}

export abstract class IQuery {
    abstract me(): User | Promise<User>;

    abstract getGame(gameId: string): Game | Promise<Game>;
}

export abstract class ISubscription {
    abstract gameActivity(gameId: string): GameActivity | Promise<GameActivity>;
}

export class User {
    id: string;
    name: string;
    email: string;
    avatar: string;
}
