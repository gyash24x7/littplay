import {
  GameAction,
  GameActionPayload,
  Player,
  UserAction,
  UserActionPayload,
} from "../typings";
import {
  ASK_CARD,
  CALL_SET,
  COMPLETE_GAME,
  CREATE_GAME,
  DECLINE_CARD,
  GIVE_CARD,
  JOIN_GAME,
  LOGIN,
  LOGOUT,
  START_GAME,
} from "./types";

export const login = (payload: UserActionPayload): UserAction => ({
	type: LOGIN,
	payload
});

export const createGame = (user: Player): GameAction => ({
	type: CREATE_GAME,
	payload: { user }
});

export const joinGame = (user: Player): GameAction => ({
	type: JOIN_GAME,
	payload: { user }
});

export const startGame = (user: Player): GameAction => ({
	type: START_GAME,
	payload: { user }
});

export const askCard = (payload: GameActionPayload): GameAction => ({
	type: ASK_CARD,
	payload
});

export const giveCard = (user: Player): GameAction => ({
	type: GIVE_CARD,
	payload: { user }
});

export const declineCard = (user: Player): GameAction => ({
	type: DECLINE_CARD,
	payload: { user }
});

export const callSet = () => ({ type: CALL_SET });

export const completeGame = () => ({ type: COMPLETE_GAME });

export const logout = (): UserAction => ({ type: LOGOUT });
