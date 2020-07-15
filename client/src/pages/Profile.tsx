import { IonContent, IonGrid, IonPage, IonText } from "@ionic/react";
import React, { useContext, useState } from "react";
import { AppModal } from "../components/AppModal";
import { ChangeAvatar } from "../components/ChangeAvatar";
import { UserContext } from "../utils/context";

export const ProfilePage = () => {
	const user = useContext(UserContext)!;
	const [isVisible, setIsVisible] = useState(false);
	return (
		<IonPage>
			<IonContent>
				<IonGrid className="container">
					<img
						src={user.avatar}
						alt=""
						className="user-avatar"
						onClick={() => setIsVisible(true)}
					/>
					<IonText className="user-name">{user.name}</IonText>
					<IonText>{user.email}</IonText>
					<IonText className="avatar-change-label" color="medium">
						Click on Avatar to modify
					</IonText>
				</IonGrid>
				{isVisible && (
					<AppModal header="Select Avatar" onClose={() => setIsVisible(false)}>
						<ChangeAvatar
							currentAvatar={user.avatar}
							close={() => setIsVisible(false)}
						/>
					</AppModal>
				)}
			</IonContent>
		</IonPage>
	);
};
