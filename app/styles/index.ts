import { StyleSheet } from "react-native";

export default StyleSheet.create({
	wrapper: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		flex: 1,
		overflow: "hidden"
	},

	card: {
		padding: "5%",
		marginBottom: "5%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		backgroundColor: "transparent",
		borderColor: "transparent",
		minWidth: "50%"
	},

	modal: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		margin: 20
	},

	modalContent: {
		padding: "10%",
		backgroundColor: "#fff",
		textAlign: "center"
	},

	logo: {
		width: 250,
		height: 250
	},

	logoMark: {
		width: 100,
		height: 100
	},

	button: {
		margin: 5,
		paddingVertical: 5,
		paddingHorizontal: 50,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		textAlign: "center",
		justifyContent: "center",
		textTransform: "uppercase",
		fontFamily: "montserrat-bold"
	},

	input: {
		textAlign: "center",
		fontSize: 20,
		fontFamily: "montserrat-bold",
		margin: 5,
		borderBottomColor: "transparent",
		backgroundColor: "#ebecf0",
		padding: 15
	},

	heading: {
		fontSize: 48,
		fontFamily: "montserrat-bold",
		textAlign: "center",
		lineHeight: 60
	},

	subHeading: {
		fontFamily: "montserrat-bold"
	},

	paragraph: {
		textAlign: "center",
		textTransform: "uppercase"
	},

	playingCard: {
		margin: 5,
		padding: 30,
		borderWidth: 3,
		borderRadius: 10,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center"
	},

	playingCardContainer: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		paddingHorizontal: "10%",
		paddingVertical: 20,
		justifyContent: "center"
	},

	suitIcon: {
		width: 40,
		height: 40
	},

	rankIcon: {
		fontSize: 40,
		lineHeight: 50,
		fontFamily: "montserrat-bold"
	},

	gamePlayContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: "5%",
		paddingHorizontal: "10%",
		width: "80%"
	},

	select: {
		margin: 5
	},

	moveAction: {
		display: "flex",
		flexDirection: "row"
	},

	flagWrapper: {
		margin: 5,
		width: "100%"
	},

	bannerContent: {
		fontFamily: "montserrat-bold",
		fontSize: 18,
		display: "flex",
		flexDirection: "column"
	},

	flexContainer: {
		display: "flex",
		flexWrap: "wrap",
		textAlign: "center"
	},

	flexContainerElement: {
		flex: 1,
		minWidth: 400
	}
});
