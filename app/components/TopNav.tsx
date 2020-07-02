import { DrawerActions, useNavigation } from "@react-navigation/native";
import {
	Icon,
	TopNavigation,
	TopNavigationAction
} from "@ui-kitten/components";
import React from "react";
import globalStyles from "../theme/globalStyles";
import { PageTitle } from "./PageTitle";

export const TopNav = () => {
	const { dispatch } = useNavigation();

	return (
		<TopNavigation
			style={[globalStyles.topNavigation]}
			title={() => <PageTitle />}
			alignment="start"
			accessoryLeft={() => (
				<TopNavigationAction
					icon={(props) => <Icon name="menu" {...props} />}
					onPress={() => dispatch(DrawerActions.openDrawer)}
				/>
			)}
		/>
	);
};
