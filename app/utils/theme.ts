import { configureFonts, DefaultTheme, Theme } from "react-native-paper";

const fontConfig: any = {
	default: {
		regular: {
			fontFamily: "montserrat-regular",
			fontWeight: "normal"
		},
		medium: {
			fontFamily: "montserrat-bold",
			fontWeight: "bold"
		},
		light: {
			fontFamily: "montserrat-light",
			fontWeight: "normal"
		},
		thin: {
			fontFamily: "montserrat-light",
			fontWeight: "normal"
		}
	}
};

export const theme: Theme = {
	...DefaultTheme,
	dark: false,
	colors: {
		...DefaultTheme.colors,
		primary: "#0747a6",
		text: "#172b4d"
	},
	fonts: configureFonts(fontConfig)
};
