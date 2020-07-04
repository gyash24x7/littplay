import {
	IonContent,
	IonHeader,
	IonIcon,
	IonItem,
	IonList,
	IonMenu,
	IonText,
	IonToolbar
} from "@ionic/react";
import { logOut, personCircle, play } from "ionicons/icons";
import React, { useContext, useRef } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../utils/context";

export const AppMenu = () => {
	const user = useContext(UserContext)!;
	const history = useHistory();
	const menuRef = useRef<HTMLIonMenuElement>(null);

	const handleMenuItemClick = (path: string) => () => {
		menuRef.current?.close();
		history.push(path);
	};

	const handleLogout = () => {
		const mode = localStorage.getItem("mode");
		localStorage.clear();
		localStorage.setItem("mode", mode || "light");
		window.location.pathname = "/login";
	};

	return (
		<IonMenu
			side="start"
			menuId="appMenu"
			swipeGesture
			contentId="appRouter"
			ref={menuRef}
		>
			<IonHeader>
				<IonToolbar color="primary">
					<div className="menu-profile-container">
						<img src={user.avatar} alt="" className="user-avatar" />
						<IonText className="user-name">{user.name}</IonText>
						<IonText>{user.email}</IonText>
					</div>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList className="app-menu-list">
					<IonItem onClick={handleMenuItemClick("/game")}>
						<IonIcon icon={play} />
						<IonText className="item-text">New Game</IonText>
					</IonItem>
					<IonItem onClick={handleMenuItemClick("/profile")}>
						<IonIcon icon={personCircle} />
						<IonText className="item-text">Profile</IonText>
					</IonItem>
				</IonList>
				<IonList className="app-menu-logout">
					<IonItem onClick={handleLogout}>
						<IonIcon icon={logOut} />
						<IonText className="item-text">Log Out</IonText>
					</IonItem>
				</IonList>
			</IonContent>
		</IonMenu>
	);
};
