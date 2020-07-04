import {
	IonButton,
	IonContent,
	IonGrid,
	IonImg,
	IonInput,
	IonItem,
	IonLoading,
	IonPage,
	IonText
} from "@ionic/react";
import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/icon.png";
import { ErrorMsg } from "../components/ErrorMsg";
import { useLoginMutation } from "../generated";

const emailRegex = /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

export const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState<string>();

	const [login, { loading }] = useLoginMutation({
		onCompleted(data) {
			localStorage.setItem("authToken", data.login);
			window.location.pathname = "/game";
		},
		onError: (error) => setErrorMsg(error.message)
	});

	const handleInput = (field: string) => (e: any) => {
		setErrorMsg(undefined);
		switch (field) {
			case "email":
				setEmail(e.target.value);
				break;
			case "password":
				setPassword(e.target.value);
				break;
		}
	};

	const validateFields = (): string | undefined => {
		switch (true) {
			case !email:
				return "Email is Required";
			case !emailRegex.test(email):
				return "Invalid Email1";
			case !password:
				return "Password is Required1";
			case password.length < 8:
				return "Password Length should be more than 8";
		}

		return;
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const errorMsg = validateFields();
		if (!errorMsg) {
			login({ variables: { email, password } });
		}
		setErrorMsg(errorMsg);
	};

	return (
		<IonPage>
			<IonContent>
				<IonLoading isOpen={loading} message="Please wait.." />
				<IonGrid fixed className="container">
					<div className="form-wrapper">
						<IonImg src={Logo} className="logo-icon" />
						<IonText className="heading">LOGIN</IonText>
						<form className="input-list" onSubmit={handleSubmit} noValidate>
							<IonItem>
								<IonInput
									placeholder="Email"
									className="app-input"
									value={email}
									type="email"
									onInput={handleInput("email")}
								/>
							</IonItem>
							<br />
							<IonItem>
								<IonInput
									placeholder="Password"
									className="app-input"
									value={password}
									onInput={handleInput("password")}
									type="password"
								/>
							</IonItem>
							<br />
							<IonButton expand="block" className="app-button" type="submit">
								Submit
							</IonButton>
							<div className="login-bottom-links">
								<IonText>Don't have an account?</IonText>
								<Link to="/signup">
									<IonText>Sign Up</IonText>
								</Link>
							</div>
							{errorMsg && <ErrorMsg message={errorMsg} />}
						</form>
					</div>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};
