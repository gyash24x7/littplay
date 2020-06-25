import {
	IonButton,
	IonButtons,
	IonHeader,
	IonIcon,
	IonTitle,
	IonToolbar
} from "@ionic/react";
import { logOut } from "ionicons/icons";
import React from "react";

export const AppHeader = () => {
	const logout = () => {
		localStorage.clear();
		window.location.pathname = "/login";
	};

	return (
		<IonHeader>
			<IonToolbar>
				<IonButtons slot="primary">
					<IonButton onClick={logout}>
						<IonIcon icon={logOut} size="large" />
					</IonButton>
				</IonButtons>
				<IonTitle className="header-container">LITERATURE</IonTitle>
			</IonToolbar>
		</IonHeader>
	);
};
