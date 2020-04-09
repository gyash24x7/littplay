import React, { useEffect, useState } from "react";

import { AppRoutes } from "./routes";
import { User } from "./typings";
import { UserContext } from "./utils/context";
import { defaultUser, onAuthStateChanged } from "./utils/firebase";

const App = () => {
	const usrStr = localStorage.getItem("user");

	const [user, setUser] = useState<User>(() => {
		return usrStr ? JSON.parse(usrStr) : defaultUser;
	});

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(setUser);
		return () => unsubscribe();
	}, []);

	return (
		<UserContext.Provider value={{ user }}>
			<AppRoutes />
		</UserContext.Provider>
	);
};

export default App;
