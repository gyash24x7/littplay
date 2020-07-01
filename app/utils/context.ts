import React from "react";
import { MeQuery } from "../generated";

export const UserContext = React.createContext<MeQuery["me"] | undefined>(
	undefined
);

interface IAuthContext {
	setIsAuthenticated: (val: boolean) => void;
}

export const AuthContext = React.createContext<IAuthContext | null>(null);
