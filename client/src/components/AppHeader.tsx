import {
	IonButtons,
	IonHeader,
	IonMenuButton,
	IonTitle,
	IonToolbar
} from "@ionic/react";
import React from "react";

export const AppHeader = () => {
	return (
		<IonHeader>
			<IonToolbar>
				<IonButtons slot="start">
					<IonMenuButton menu="appMenu" />
				</IonButtons>
				<IonTitle className="montserrat-bold">LITERATURE</IonTitle>
			</IonToolbar>
		</IonHeader>
	);
};
