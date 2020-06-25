import { IonContent, IonGrid, IonPage, IonText } from "@ionic/react";
import Avatar from "avataaars";
import React, { useContext } from "react";
import { AppHeader } from "../components/AppHeader";
import { UserContext } from "../utils/context";

export const ProfilePage = () => {
	const user = useContext(UserContext)!;
	return (
		<IonPage>
			<AppHeader />
			<IonContent>
				<IonGrid className="container">
					<Avatar
						avatarStyle="Circle"
						{...JSON.parse(user.avatar)}
						style={{ width: 150, height: 200 }}
					/>
					<IonText className="user-name">{user.name}</IonText>
					<IonText>{user.email}</IonText>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};
