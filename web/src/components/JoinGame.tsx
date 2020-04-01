import Button from "@atlaskit/button";
import Modal, { ModalTransition } from "@atlaskit/modal-dialog";
import Textfield from "@atlaskit/textfield";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Player } from "../typings";
import firebase, { db } from "../utils/firebase";

interface JoinGameProps {
	visible: boolean;
	setVisible: (val: boolean) => void;
}

export const JoinGame = (props: JoinGameProps) => {
	const [gameId, setGameId] = useState("");
	const [loading, setLoading] = useState(false);

	const user: Player = JSON.parse(localStorage.getItem("user")!);

	const handleTextChange = (text: string) => {
		if (text.length < 7) {
			setGameId(text.toUpperCase());
		}
	};

	const history = useHistory();

	const goToGame = async () => {
		setLoading(true);

		await db
			.collection("games")
			.doc(gameId)
			.update({
				players: firebase.firestore.FieldValue.arrayUnion(user)
			});

		setLoading(false);
		history.push(`/play/${gameId}`);
	};

	return (
		<ModalTransition>
			{props.visible && (
				<Modal isChromeless onClose={() => props.setVisible(false)}>
					<div className="modal">
						<div className="modal-content">
							<div className="input-wrapper">
								<Textfield
									appearance="none"
									value={gameId}
									label="Enter Game ID"
									onChange={(e: any) => {
										e.persist();
										handleTextChange(e.target.value);
									}}
									className="input"
									placeholder="ENTER GAME ID"
								/>
							</div>
							<Button
								className="button"
								appearance="primary"
								onClick={goToGame}
								isDisabled={loading}
								isLoading={loading}
							>
								Join Game
							</Button>
						</div>
					</div>
				</Modal>
			)}
		</ModalTransition>
	);
};
