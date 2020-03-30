import { StyleSheet } from "react-native";

export default StyleSheet.create({
	wrapper: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100vh"
	},

	card: {
		padding: "5vh",
		backgroundColor: "transparent",
		borderColor: "transparent"
	},

	modal: {
		padding: "5vh",
		minWidth: "50vw"
	},

	logo: {
		width: 250,
		height: 250
	},

	logoMark: {
		width: 100,
		height: 100,
		marginTop: "-10vh"
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
		marginBottom: 30,
		textAlign: "center"
	},

	paragraph: {
		fontSize: 20,
		marginBottom: 15,
		textAlign: "center"
	},

	labelStyle: {
		textAlign: "center",
		fontWeight: "bold",
		color: "#7A869A",
		marginBottom: 5
	},

	bottomText: {
		fontWeight: "bold",
		textAlign: "center",
		lineHeight: 24,
		position: "absolute",
		bottom: 0
	},

	playingCardContainer: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		padding: 5,
		justifyContent: "center"
	},

	playingCard: {
		margin: 5,
		padding: 5,
		borderWidth: 3,
		borderColor: "#172b4d",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center"
	},

	suitIcon: {
		width: 50,
		height: 50
	},

	rankIcon: {
		fontWeight: "900",
		fontSize: 50,
		lineHeight: 70
	},

	gamePlayContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},

	select: {
		margin: 5
	},

	moveAction: {
		display: "flex",
		flexDirection: "row"
	}
});
