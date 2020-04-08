import React from "react";

import { User } from "../typings";

export const UserContext = React.createContext(
	{} as { user: User; setUser: (val: any) => void }
);
