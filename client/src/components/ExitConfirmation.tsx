import { Plugins } from "@capacitor/core";
import { IonButton } from "@ionic/react";
import React from "react";

interface ExitConfirmationProps {
	closeModal: () => void;
}

export const ExitConfirmation = ({ closeModal }: ExitConfirmationProps) => {
	return (
		<div style={{ display: "flex" }}>
			<IonButton className="app-button small" color="dark" onClick={closeModal}>
				No
			</IonButton>
			<IonButton
				className="app-button small"
				color="danger"
				onClick={() => Plugins.App.exitApp()}
			>
				Yes
			</IonButton>
		</div>
	);
};
