import {
	IonButtons,
	IonHeader,
	IonMenuButton,
	IonTitle,
	IonToolbar
} from "@ionic/react";
import React, { useContext } from "react";
import Moon from "../assets/moon.svg";
import Sun from "../assets/sun.svg";
import { ThemeContext } from "../utils/context";

export const AppHeader = () => {
	const { isDark, setIsDark } = useContext(ThemeContext);
	const toggleDarkMode = () => setIsDark(!isDark);

	return (
		<IonHeader>
			<IonToolbar>
				<IonButtons slot="start">
					<IonMenuButton menu="appMenu" />
				</IonButtons>
				<IonButtons slot="end">
					<img
						src={isDark ? Sun : Moon}
						alt=""
						onClick={toggleDarkMode}
						className="dark-mode-toggle"
					/>
				</IonButtons>
				<IonTitle className="montserrat-bold">LITERATURE</IonTitle>
			</IonToolbar>
		</IonHeader>
	);
};
