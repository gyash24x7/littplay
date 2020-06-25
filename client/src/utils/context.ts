import React from "react";
import { User } from "../generated";

export const UserContext = React.createContext<User | undefined>(undefined);
