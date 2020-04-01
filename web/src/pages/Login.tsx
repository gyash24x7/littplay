import Button from "@atlaskit/button";
import Textfield from "@atlaskit/textfield";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Logo from "../assets/icon.png";
import { Player } from "../typings";
import firebase, { AuthProvider } from "../utils/firebase";

export const LoginScreen = () => {
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState("");

	const login = async () => {
		setLoading(true);
		const result: any = await firebase.auth().signInWithPopup(AuthProvider);
		const user: Player = { name, email: result.user.email };
		localStorage.setItem("user", JSON.stringify(user));
		setLoading(false);
		history.push("/");
	};

	return (
		<div className="wrapper">
			<div className="card">
				<img src={Logo} alt="" className="logo" />
				<div className="input-wrapper">
					<Textfield
						appearance="none"
						value={name}
						isDisabled={loading}
						onChange={(e: any) => {
							e.persist();
							setName(e.target.value.toUpperCase());
						}}
						className="input"
						placeholder="ENTER NAME"
					/>
				</div>
				<Button
					onClick={login}
					isDisabled={loading || !name}
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
