import { ApolloProvider } from "@apollo/client";
import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
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
import React, { useEffect, useState } from "react";
import { client } from "./graphql";
import { AppRoutes } from "./routes";
import "./styles/app.scss";
import "./styles/variables.css";
import { ThemeContext } from "./utils/context";

const App: React.FC = () => {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		const mode = localStorage.getItem("mode");
		if (mode) {
			if (mode === "dark") setIsDark(true);
		} else if (matchMedia("(prefers-color-scheme:dark)").matches) {
			setIsDark(true);
		}
	}, []);

	useEffect(() => {
		document.body.classList.remove(isDark ? "light" : "dark");
		document.body.classList.add(isDark ? "dark" : "light");
		localStorage.setItem("mode", isDark ? "dark" : "light");
	}, [isDark]);

	return (
		<IonApp>
			<IonReactRouter>
				<ApolloProvider client={client}>
					<ThemeContext.Provider value={{ isDark, setIsDark }}>
						<AppRoutes />
					</ThemeContext.Provider>
				</ApolloProvider>
			</IonReactRouter>
		</IonApp>
	);
};

export default App;
