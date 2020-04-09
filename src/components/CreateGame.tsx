import Button from "@atlaskit/button";
import Modal, { ModalTransition } from "@atlaskit/modal-dialog";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { UserContext } from "../utils/context";
import { db } from "../utils/firebase";

interface CreateGameProps {
	visible: boolean;
	setVisible: (val: boolean) => void;
	gameId: string;
}

export const CreateGame = (props: CreateGameProps) => {
	const [loading, setLoading] = useState(false);

	const { user } = useContext(UserContext);

	const history = useHistory();

	const goToGame = async () => {
		setLoading(true);
		let gameUpdate: any = {};
		gameUpdate[`players.${user.name}`] = [];

		await db.collection("games").doc(props.gameId).update(gameUpdate);

		setLoading(false);
		history.push(`/play/${props.gameId}`);
	};

	return (
		<ModalTransition>
			{props.visible && (
				<Modal onClose={() => props.setVisible(false)} isChromeless>
					<div className="modal">
						<div className="modal-content">
							<h3 className="paragraph">Your Game ID is</h3>
							<h1 className="heading">{props.gameId}</h1>
							<h3 className="paragraph">
								Ask Players to join the game with this ID
							</h3>
							<br />
							<Button
								className="button"
								onClick={goToGame}
								isDisabled={loading}
								isLoading={loading}
								appearance="primary"
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
