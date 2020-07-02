import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import globalStyles from "../theme/globalStyles";

export const PageTitle = () => {
	return (
		<Layout
			style={{
				width: "100%",
				backgroundColor: "transparent"
			}}
		>
			<Text
				style={[
					globalStyles.title,
					{ textAlign: "center", color: "#36b37e", fontSize: 28 }
				]}
			>
				LITERATURE
			</Text>
		</Layout>
	);
};
