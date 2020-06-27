import {
	IonButton,
	IonInput,
	IonItem,
	IonList,
	IonLoading
} from "@ionic/react";
import React, { Fragment, useState } from "react";
import { useHistory } from "react-router";
import { useJoinGameMutation } from "../generated";
import { ErrorMsg } from "./ErrorMsg";

export const JoinGame = () => {
	const [gameCode, setGameCode] = useState("");
	const [errorMsg, setErrorMsg] = useState<string>();
	const history = useHistory();

	const [joinGame, { loading }] = useJoinGameMutation({
		variables: { gameCode },
		onCompleted: ({ joinGame }) => history.push(`/play/${joinGame.id}`)
	});

	const validateData = () => {
		if (!gameCode) return "GameCode is Required!";
		return;
	};

	const handleSubmit = () => {
		const errorMsg = validateData();
		if (!errorMsg) joinGame();
		setErrorMsg(errorMsg);
	};

	return (
		<Fragment>
			<IonLoading isOpen={loading} />
			<IonList className="input-list">
				<IonItem>
					<IonInput
						className="app-input join-game"
						placeholder="Game Code"
						value={gameCode}
						onInput={(e: any) => setGameCode(e.target.value.toUpperCase())}
					/>
				</IonItem>
			</IonList>
			<IonButton className="app-button" onClick={handleSubmit}>
				Join Game
			</IonButton>
			<ErrorMsg message={errorMsg} />
		</Fragment>
	);
};
