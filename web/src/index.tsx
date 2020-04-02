import "./assets/fonts/montserrat-bold.ttf";
import "./assets/fonts/montserrat-light.ttf";
import "./assets/fonts/montserrat-regular.ttf";
import "./styles/index.css";
import "@atlaskit/css-reset/dist/bundle.css";

import React from "react";
import ReactDOM from "react-dom";

import { AppRoutes } from "./routes";
import * as serviceWorker from "./serviceWorker";

const renderApp = (Component: () => JSX.Element) => {
	ReactDOM.render(<Component />, document.getElementById("root"));
};

renderApp(AppRoutes);

declare var module: any;

if (module.hot && process.env.NODE_ENV === "development") {
	module.hot.accept("./routes", () => {
		const NextApp = require("./App");
		renderApp(NextApp);
	});
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if (process.env.NODE_ENV === "development") serviceWorker.unregister();
else serviceWorker.register();
