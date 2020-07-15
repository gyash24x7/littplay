import { createContext } from "react";
import { GetGameQuery, User } from "../generated";

export const UserContext = createContext<User | undefined>(undefined);

export const GameContext = createContext<GetGameQuery["getGame"] | undefined>(
	undefined
);

export interface IThemeContext {
	isDark: boolean;
	setIsDark: (val: boolean) => void;
}

export const ThemeContext = createContext<IThemeContext>({
	isDark: false,
	setIsDark: (_val) => {}
});
