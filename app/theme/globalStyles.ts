import { StyleSheet } from "react-native";

export default StyleSheet.create({
	wrapper: {
		display: "flex",
		alignItems: "center",
		padding: 10,
		flex: 1
	},

	topNavigation: {
		borderBottomColor: "#303030",
		borderBottomWidth: 1,
		height: 70
	},

	list: { width: "100%", flex: 1, borderWidth: 1, borderColor: "#303030" },

	drawerNavigation: {
		backgroundColor: "#141414",
		borderRightColor: "#303030",
		borderRightWidth: 1
	},

	heading: {
		fontFamily: "montserrat-bold",
		textTransform: "uppercase",
		color: "#B3B3B3"
	},

	text: {},

	link: {
		textTransform: "capitalize",
		color: "#0052cc"
	},

	title: {
		fontFamily: "montserrat-bold",
		textTransform: "uppercase",
		fontSize: 20
	},

	errorMsg: {
		color: "#de350b",
		textTransform: "uppercase",
		fontFamily: "montserrat-bold",
		fontSize: 11,
		textAlign: "center",
		marginTop: 10
	},

	section: {
		width: "100%",
		padding: 15,
		borderWidth: 1,
		borderColor: "#303030",
		borderRadius: 5
	}
});
