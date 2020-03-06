import React from "react";
import { Provider as PaperProvider } from "react-native-paper";

import { AppRoutes } from "./routes";

const App = () => (
	<PaperProvider>
		<AppRoutes />
	</PaperProvider>
);

export default App;
