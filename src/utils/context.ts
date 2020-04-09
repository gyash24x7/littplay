import React from "react";

import { Game, User } from "../typings";

export const UserContext = React.createContext(
	{} as { user: User; setUser: (val: any) => void }
);

export const GameContext = React.createContext<Game | undefined>(undefined);
