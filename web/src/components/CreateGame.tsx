import Button from "@atlaskit/button";
import Modal, { ModalTransition } from "@atlaskit/modal-dialog";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { User } from "../typings";
import { db } from "../utils/firebase";

interface CreateGameProps {
	visible: boolean;
	setVisible: (val: boolean) => void;
	gameId: string;
}

export const CreateGame = (props: CreateGameProps) => {
	const [loading, setLoading] = useState(false);

	const user: User = JSON.parse(localStorage.getItem("user")!);

	const history = useHistory();

	const goToGame = async () => {
		setLoading(true);

		await db
			.collection("games")
			.doc(props.gameId)
			.collection("players")
			.doc(user.email)
			.set({ name: user.displayName });

		setLoading(false);
		history.push(`/play/${props.gameId}`);
	};

	return (
		<ModalTransition>
			{props.visible && (
				<Modal onClose={() => props.setVisible(false)} isChromeless>
					<div className="modal">
						<div className="modal-content">
							<div className="paragraph">Your Game ID is</div>
							<div className="heading">{props.gameId}</div>
							<div className="paragraph">
								Ask Players to join the game with this ID
							</div>
							<Button
								className="button"
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
