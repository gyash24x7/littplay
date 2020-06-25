import {
	IonButton,
	IonButtons,
	IonContent,
	IonGrid,
	IonHeader,
	IonIcon,
	IonPage,
	IonText,
	IonTitle,
	IonToolbar
} from "@ionic/react";
import { logOut } from "ionicons/icons";
import React, { useContext } from "react";
import { UserContext } from "../utils/context";

export const ProfilePage = () => {
	const user = useContext(UserContext)!;
	const logout = () => {
		localStorage.clear();
		window.location.pathname = "/login";
	};

	return (
		<IonPage>
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
			<IonContent>
				<IonGrid className="container">
					<img src={user.avatar} alt="" style={{ width: 150 }} />
					<IonText className="user-name">{user.name}</IonText>
					<IonText>{user.email}</IonText>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};
