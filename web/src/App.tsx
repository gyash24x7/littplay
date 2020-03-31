import "./assets/fonts/montserrat-bold.ttf";
import "./assets/fonts/montserrat-light.ttf";
import "./assets/fonts/montserrat-regular.ttf";
import "./styles/index.css";
import "@atlaskit/css-reset/dist/bundle.css";

import React from "react";
import { hot } from "react-hot-loader/root";

import { AppRoutes } from "./routes";

const App = hot(() => <AppRoutes />);

export default App;
