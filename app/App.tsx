import { ApplicationProvider } from "@ui-kitten/components";
import * as Font from "expo-font";
import React, { useEffect, useState } from "react";

import { AppRoutes } from "./routes";
import { customMapping, customTheme } from "./utils/theme";

export default function App() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		Font.loadAsync({
			"montserrat-regular": require("./assets/fonts/montserrat-regular.ttf"),
			"montserrat-bold": require("./assets/fonts/montserrat-bold.ttf"),
			"montserrat-light": require("./assets/fonts/montserrat-light.ttf")
		}).then(() => setLoading(false));
	}, [setLoading]);

	return (
		<ApplicationProvider theme={customTheme} mapping={customMapping}>
			{!loading && <AppRoutes />}
		</ApplicationProvider>
	);
}

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: "#fff",
// 		alignItems: "center",
// 		justifyContent: "center"
// 	}
// });
