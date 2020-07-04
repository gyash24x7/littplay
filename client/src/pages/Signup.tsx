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
import { useCreateUserMutation } from "../generated";

const emailRegex = /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

export const SignUpPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState<string>();

	const [createUser, { loading }] = useCreateUserMutation({
		onCompleted(data) {
			localStorage.setItem("authToken", data.createUser);
			window.location.pathname = "/game";
		},
		onError: (error) => setErrorMsg(error.message)
	});

	const handleInput = (field: string) => (e: any) => {
		setErrorMsg(undefined);
		switch (field) {
			case "name":
				setName(e.target.value);
				break;
			case "email":
				setEmail(e.target.value);
				break;
			case "password":
				setPassword(e.target.value);
				break;
			case "confirmPassword":
				setConfirmPassword(e.target.value);
				break;
		}
	};

	const validateFields = (): string | undefined => {
		switch (true) {
			case !name:
				return "Name is Required";
			case !email:
				return "Email is Required";
			case !emailRegex.test(email):
				return "Invalid Email1";
			case !password || !confirmPassword:
				return "Password is Required1";
			case password.length < 8:
				return "Password Length should be more than 8";
			case password !== confirmPassword:
				return "Passwords do not Match";
		}

		return;
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const errorMsg = validateFields();
		if (!errorMsg) {
			createUser({ variables: { name, email, password } });
		}
		setErrorMsg(errorMsg);
	};

	return (
		<IonPage>
			<IonContent>
				<IonLoading isOpen={loading} message="Please wait..." />
				<IonGrid fixed className="container">
					<div className="form-wrapper">
						<IonImg src={Logo} className="logo-icon" />
						<IonText className="heading">SIGN UP</IonText>
						<form className="input-list" onSubmit={handleSubmit} noValidate>
							<IonItem>
								<IonInput
									placeholder="Name"
									className="app-input"
									value={name}
									onInput={handleInput("name")}
								/>
							</IonItem>
							<br />
							<IonItem>
								<IonInput
									placeholder="Email"
									className="app-input"
									type="email"
									value={email}
									onInput={handleInput("email")}
								/>
							</IonItem>
							<br />
							<IonItem>
								<IonInput
									placeholder="Password"
									className="app-input"
									type="password"
									value={password}
									onInput={handleInput("password")}
								/>
							</IonItem>
							<br />
							<IonItem>
								<IonInput
									placeholder="Confirm Password"
									className="app-input"
									type="password"
									value={confirmPassword}
									onInput={handleInput("confirmPassword")}
								/>
							</IonItem>
							<br />
							<IonButton expand="block" className="app-button" type="submit">
								Submit
							</IonButton>
							<div className="login-bottom-links">
								<IonText>Already have an account?</IonText>
								<Link to="login">
									<IonText>Login</IonText>
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
