import React from "react";
import { GetGameQuery, User } from "../generated";

export const UserContext = React.createContext<User | undefined>(undefined);

export const GameContext = React.createContext<
	GetGameQuery["getGame"] | undefined
>(undefined);
