import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

const renderApp = (Component: () => JSX.Element) => {
	ReactDOM.render(<Component />, document.getElementById("root"));
};

renderApp(App);

declare var module: any;

if (module.hot && process.env.NODE_ENV === "development") {
	module.hot.accept("./App", () => {
		const NextApp = require("./App");
		renderApp(NextApp);
	});
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
