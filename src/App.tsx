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
import React from "react";

import { AppRoutes } from "./routes";

const App = () => (
	<IonApp>
		<AppRoutes />
	</IonApp>
);

export default App;
