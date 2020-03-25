import { StyleSheet } from "react-native";

export default StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},

	card: {
		padding: "10vh",
		textAlign: "center"
	},

	logo: {
		width: 250,
		height: 250
	},
	backdrop: {
		backgroundColor: "rgba(0, 0, 0, 0.5)"
	},

	button: {
		margin: 5
	},

	heading: {
		fontWeight: "700",
		fontSize: 48,
		fontFamily: "montserrat-bold",
		margin: 15,
		marginBottom: 30
	},

	paragraph: {
		fontSize: 20,
		marginBottom: 15
	},

	labelStyle: {
		textAlign: "center",
		textTransform: "uppercase"
	},

	bottomText: {
		fontWeight: "bold",
		position: "absolute",
		bottom: "-9vh",
		lineHeight: 24
	}
});
