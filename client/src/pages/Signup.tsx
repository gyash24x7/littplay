import {
	IonButton,
	IonContent,
	IonGrid,
	IonImg,
	IonInput,
	IonItem,
	IonPage,
	IonText
} from "@ionic/react";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/icon.png";

export const SignUpPage = () => {
	return (
		<IonPage>
			<IonContent>
				<IonGrid fixed className="public-container">
					<div className="form-wrapper">
						<IonImg src={Logo} className="logo-icon" />
						<IonText className="heading">SIGN UP</IonText>
						<div className="input-list">
							<IonItem>
								<IonInput placeholder="Name" className="input" />
							</IonItem>
							<br />
							<IonItem>
								<IonInput placeholder="Email" className="input" />
							</IonItem>
							<br />
							<IonItem>
								<IonInput
									placeholder="Password"
									className="input"
									type="password"
								/>
							</IonItem>
							<br />
							<IonItem>
								<IonInput
									placeholder="Confirm Password"
									className="input"
									type="password"
								/>
							</IonItem>
							<br />
							<IonButton expand="block" className="button">
								Submit
							</IonButton>
							<div className="login-bottom-links">
								<IonText>Already have an account?</IonText>
								<Link to="login">
									<IonText>Login</IonText>
								</Link>
							</div>
						</div>
					</div>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};
