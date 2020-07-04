import { ToggleChangeEventDetail } from "@ionic/core";
import {
	IonButtons,
	IonHeader,
	IonLabel,
	IonMenuButton,
	IonTitle,
	IonToggle,
	IonToolbar
} from "@ionic/react";
import React from "react";

export const AppHeader = () => {
	const handleModeSwitch = (e: CustomEvent<ToggleChangeEventDetail>) => {
		if (e.detail.checked) {
			document.body.classList.replace("light", "dark");
			localStorage.setItem("mode", "dark");
		} else {
			document.body.classList.replace("dark", "light");
			localStorage.setItem("mode", "light");
		}
	};

	return (
		<IonHeader>
			<IonToolbar>
				<IonButtons slot="start">
					<IonMenuButton menu="appMenu" />
				</IonButtons>
				<IonButtons slot="end">
					<IonToggle
						onIonChange={handleModeSwitch}
						color="dark"
						checked={localStorage.getItem("mode") === "dark"}
					/>
					<IonLabel className="dark-mode-label">Dark Mode</IonLabel>
				</IonButtons>
				<IonTitle className="montserrat-bold">LITERATURE</IonTitle>
			</IonToolbar>
		</IonHeader>
	);
};
