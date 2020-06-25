import { IonIcon, IonText } from "@ionic/react";
import { warning } from "ionicons/icons";
import React, { Fragment } from "react";

interface ErrorMsgProps {
	message?: string;
}

export const ErrorMsg = ({ message }: ErrorMsgProps) => {
	return (
		<div className="error-msg-container">
			{message && (
				<Fragment>
					<IonIcon icon={warning} color="danger" size="large" />
					<IonText color="danger" className="error-msg">
						{message}
					</IonText>
				</Fragment>
			)}
		</div>
	);
};
