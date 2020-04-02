import { combineReducers } from "redux";

import { Game, Player, Store } from "../typings";
import { GameReducer } from "./GameReducer";
import { UserReducer } from "./UserReducer";

export const initialState: Store = {
	game: {} as Game,
	user: {} as Player
};

export const reducer = combineReducers({
	game: GameReducer,
	user: UserReducer
});
