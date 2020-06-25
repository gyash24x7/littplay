import {
	IonButton,
	IonButtons,
	IonContent,
	IonGrid,
	IonHeader,
	IonIcon,
	IonPage,
	IonTitle,
	IonToolbar
} from "@ionic/react";
import { ellipsisVertical } from "ionicons/icons";
import React, { useContext } from "react";
import { UserContext } from "../utils/context";

export const ProfilePage = () => {
	const user = useContext(UserContext)!;

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="primary">
						<IonButton>
							<IonIcon icon={ellipsisVertical} />
						</IonButton>
					</IonButtons>
					<IonTitle className="header-container">LITERATURE</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonGrid className="container">
					<img src={user.avatar} alt="" style={{ width: 150 }} />
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};
