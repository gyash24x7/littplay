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
import React, { useEffect } from "react";
import { client } from "./graphql";
import { AppRoutes } from "./routes";
import "./styles/app.scss";
import "./styles/variables.css";

const App: React.FC = () => {
	useEffect(() => {
		const mode = localStorage.getItem("mode") || "light";
		document.body.classList.add(mode);
	}, []);

	return (
		<IonApp>
			<IonReactRouter>
				<ApolloProvider client={client}>
					<AppRoutes />
				</ApolloProvider>
			</IonReactRouter>
		</IonApp>
	);
};

export default App;
