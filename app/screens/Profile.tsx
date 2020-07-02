import { Layout, Text } from "@ui-kitten/components";
import React, { Fragment, useContext } from "react";
import { StyleSheet } from "react-native";
import { SvgUri } from "react-native-svg";
import { TopNav } from "../components/TopNav";
import globalStyles from "../theme/globalStyles";
import { UserContext } from "../utils/context";

export const ProfileScreen = () => {
	const user = useContext(UserContext)!;

	return (
		<Fragment>
			<TopNav />
			<Layout style={styles.profileWrapper}>
				<SvgUri uri={user.avatar} width={200} height={210} />
				<Text style={[globalStyles.title, styles.userName]}>{user.name}</Text>
				<Text>{user.email}</Text>
			</Layout>
		</Fragment>
	);
};

const styles = StyleSheet.create({
	profileWrapper: {
		display: "flex",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingBottom: 100
	},

	userName: {
		paddingTop: 20
	}
});
