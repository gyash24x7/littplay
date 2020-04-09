import "./theme/index.css";
import "./theme/variables.css";
import "@atlaskit/css-reset/dist/bundle.css";
import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";

import { IonApp } from "@ionic/react";
import React, { useEffect, useState } from "react";

import { AppRoutes } from "./routes";
import { User } from "./typings";
import { UserContext } from "./utils/context";

const App = () => {
	const [user, setUser] = useState({} as User);

	const setUserContext = (userState: User) => {
		localStorage.setItem("user", JSON.stringify(userState));
		setUser(userState);
	};

	useEffect(() => {
		const userString = localStorage.getItem("user");
		setUser(JSON.parse(userString || ""));
	}, []);

	return (
		<IonApp>
			<UserContext.Provider value={{ user, setUser: setUserContext }}>
				<AppRoutes />
			</UserContext.Provider>
		</IonApp>
	);
};

export default App;
