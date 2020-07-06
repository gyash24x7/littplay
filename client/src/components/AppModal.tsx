import {
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle,
	IonIcon
} from "@ionic/react";
import { close } from "ionicons/icons";
import React, { ReactChild } from "react";

interface AppModalProps {
	header: string;
	onClose: () => void;
	children: ReactChild;
}

export const AppModal = (props: AppModalProps) => {
	return (
		<div className="app-modal-container">
			<IonCard className="app-modal">
				<IonCardHeader className="modal-header">
					<IonCardTitle>{props.header}</IonCardTitle>
					<IonIcon
						icon={close}
						onClick={props.onClose}
						className="modal-close-icon"
					/>
				</IonCardHeader>
				<IonCardContent className="modal-content">
					{props.children}
				</IonCardContent>
			</IonCard>
		</div>
	);
};
