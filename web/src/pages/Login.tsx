import Button from "@atlaskit/button";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Logo from "../assets/icon.png";
import { User } from "../typings";
import firebase, { AuthProvider } from "../utils/firebase";

export const LoginScreen = () => {
	const history = useHistory();
	const [loading, setLoading] = useState(false);

	const login = async () => {
		setLoading(true);
		const result: any = await firebase.auth().signInWithPopup(AuthProvider);
		const token = result.credential.accessToken;
		const user: User = {
			displayName: result.user.displayName,
			photoUrl: result.user.photoUrl,
			phoneNumber: result.user.phoneNumber,
			email: result.user.email
		};
		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("token", token);
		setLoading(false);
		history.push("/");
	};

	return (
		<div className="wrapper">
			<div className="card">
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
	);
};
