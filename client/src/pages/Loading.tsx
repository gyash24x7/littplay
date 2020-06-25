import { IonPage, IonSpinner } from "@ionic/react";
import React from "react";

export const LoadingPage = () => (
	<IonPage>
		<div className="public-container">
			<IonSpinner />
		</div>
	</IonPage>
);
