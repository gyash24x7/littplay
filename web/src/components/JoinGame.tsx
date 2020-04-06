import Button from "@atlaskit/button";
import Modal, { ModalTransition } from "@atlaskit/modal-dialog";
import Textfield from "@atlaskit/textfield";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Game, User } from "../typings";
import { db } from "../utils/firebase";

interface JoinGameProps {
	visible: boolean;
	setVisible: (val: boolean) => void;
}

export const JoinGame = (props: JoinGameProps) => {
	const [gameId, setGameId] = useState("");
	const [loading, setLoading] = useState(false);

	const user: User = JSON.parse(localStorage.getItem("user")!);

	const handleTextChange = (text: string) => {
		if (text.length < 7) {
			setGameId(text.toUpperCase());
		}
	};

	const history = useHistory();

	const goToGame = async () => {
		setLoading(true);

		const data: Game = (
			await db.collection("games").doc(gameId).get()
		).data() as any;

		let gameUpdate: any = {};
		gameUpdate[`players.${user.name}`] = [];

		if (!data.players[user.name]) {
			await db.collection("games").doc(gameId).update(gameUpdate);
		}

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
