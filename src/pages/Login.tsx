import Button from "@atlaskit/button";
import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";

import Logo from "../assets/icon.png";
import { User } from "../typings";
import firebase, { AuthProvider } from "../utils/firebase";

export const LoginScreen = () => {
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	const login = async () => {
		setLoading(true);
		const result: any = await firebase.auth().signInWithPopup(AuthProvider);
		const user: User = {
			name: result.user.displayName,
			email: result.user.email,
			loggedIn: true
		};
		localStorage.setItem("user", JSON.stringify(user));
		setLoading(false);
		history.push("/");
	};

	return (
		<Fragment>
			<div className="wrapper" style={{ justifyContent: "center" }}>
				<div className="card" style={{ marginBottom: "10vh" }}>
					<img src={Logo} alt="" className="logo" />

					<Button
						onClick={login}
						isDisabled={loading}
						isLoading={loading}
						appearance="primary"
						className="button"
					>
						Log in with Google
					</Button>
				</div>
			</div>
		</Fragment>
	);
};
