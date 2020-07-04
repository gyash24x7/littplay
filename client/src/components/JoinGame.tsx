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
	const [code, setCode] = useState("");
	const [errorMsg, setErrorMsg] = useState<string>();
	const history = useHistory();

	const [joinGame, { loading }] = useJoinGameMutation({
		variables: { code },
		onCompleted: ({ joinGame }) => history.push(`/game/${joinGame}`),
		onError: ({ message }) => setErrorMsg(message)
	});

	const validateData = () => {
		if (!code) return "Code is Required!";
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
						value={code}
						onInput={(e: any) => setCode(e.target.value.toUpperCase())}
					/>
				</IonItem>
			</IonList>
			<IonButton className="app-button" onClick={handleSubmit}>
				Join Game
			</IonButton>
			{errorMsg && <ErrorMsg message={errorMsg} />}
		</Fragment>
	);
};
