import { IonContent, IonGrid, IonPage, IonText } from "@ionic/react";
import React, { useContext } from "react";
import { UserContext } from "../utils/context";

export const ProfilePage = () => {
	const user = useContext(UserContext)!;
	return (
		<IonPage>
			<IonContent>
				<IonGrid className="container">
					<img src={user.avatar} alt="" className="user-avatar" />
					<IonText className="user-name">{user.name}</IonText>
					<IonText>{user.email}</IonText>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};
