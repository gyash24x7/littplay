import { initialState } from ".";
import { LOGIN, LOGOUT } from "../actions/types";
import { ActionType, Player } from "../typings";

export const UserReducer = (
	state = initialState.user,
	{ type, payload }: ActionType
): Player => {
	switch (type) {
		case LOGOUT:
			return initialState.user;

		case LOGIN:
			return payload!;

		default:
			return state;
	}
};
