import Spinner from "@atlaskit/spinner";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const LoadingScreen = () => {
	const history = useHistory();
	const loggedIn = !!localStorage.getItem("user");

	useEffect(() => {
		history.push(loggedIn ? "/" : "/login");
	});

	return (
		<div className="wrapper">
			<Spinner />
		</div>
	);
};
