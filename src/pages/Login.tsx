import Button from "@atlaskit/button";
import Textfield from "@atlaskit/textfield";
import { IonPage } from "@ionic/react";
import React, { useState } from "react";

import Logo from "../assets/icon.png";
import { User } from "../typings";
import firebase, { AuthProvider } from "../utils/firebase";

export const LoginScreen = () => {
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState("");

	const login = async () => {
		setLoading(true);
		const result: any = await firebase.auth().signInWithPopup(AuthProvider);
		const user: User = { name, email: result.user.email };
		localStorage.setItem("user", JSON.stringify(user));
		setLoading(false);
		window.location.pathname = "/";
	};

	return (
		<IonPage>
			<div className="wrapper" style={{ justifyContent: "center" }}>
				<div className="card" style={{ marginBottom: "10vh" }}>
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
		</IonPage>
	);
};
