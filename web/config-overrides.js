const { override, addBabelPlugin, addWebpackAlias } = require("customize-cra");

module.exports = override(
	addBabelPlugin("react-hot-loader/babel"),
	addWebpackAlias({
		"react-dom":
			process.env.NODE_ENV === "production"
				? "react-dom"
				: "@hot-loader/react-dom",
		"react-native": "react-native-web"
	})
);
