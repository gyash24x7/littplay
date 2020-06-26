import { IonButton, IonInput, IonItem, IonList } from "@ionic/react";
import React, { Fragment } from "react";

interface JoinGameProps {
	withInput?: boolean;
	gameCode?: string;
}

export const JoinGame = (props: JoinGameProps) => {
	return (
		<Fragment>
			{props.withInput && (
				<IonList>
					<IonItem>
						<IonInput className="app-input" placeholder="Game Code" />
					</IonItem>
				</IonList>
			)}
			<IonButton className="app-button" onClick={() => console.log("hello")}>
				Join Game
			</IonButton>
			<br />
		</Fragment>
	);
};
