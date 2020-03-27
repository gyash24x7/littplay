import { light, mapping } from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import * as Font from "expo-font";
import React, { useEffect, useState } from "react";
import { hot } from "react-hot-loader/root";

import { AppRoutes } from "./routes";
import { customMapping, customTheme } from "./utils/theme";

const theme = { ...light, ...customTheme };

const App = hot(() => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		Font.loadAsync({
			"montserrat-regular": require("./assets/fonts/montserrat-regular.ttf"),
			"montserrat-bold": require("./assets/fonts/montserrat-bold.ttf"),
			"montserrat-light": require("./assets/fonts/montserrat-light.ttf")
		}).then(() => setLoading(false));
	}, [setLoading]);

	return (
		<ApplicationProvider
			theme={theme}
			mapping={mapping}
			customMapping={customMapping}
		>
			{!loading && <AppRoutes />}
		</ApplicationProvider>
	);
});

export default App;
