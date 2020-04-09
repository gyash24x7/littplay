import Button from "@atlaskit/button";
import Modal, { ModalTransition } from "@atlaskit/modal-dialog";
import Textfield from "@atlaskit/textfield";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { GameModalProps, Team } from "../typings";
import { GameContext } from "../utils/context";
import { db } from "../utils/firebase";

export const CreateTeams = (props: GameModalProps) => {
	const { gameId } = useParams();
	const [loading, setLoading] = useState(false);
	const [teamA, setTeamA] = useState("");
	const [teamB, setTeamB] = useState("");

	const gameData = useContext(GameContext);
	const players = Object.keys(gameData?.players || {});

	const handleTextInput = (index: number) => (e: any) => {
		e.persist();
		if (index === 0) setTeamA(e.target.value.toUpperCase());
		else setTeamB(e.target.value.toUpperCase());
	};

	const createTeams = async () => {
		setLoading(true);
		let teams: Record<string, Team> = {};
		teams[teamA] = { score: 0, members: players.slice(0, 1) };
		teams[teamB] = { score: 0, members: players.slice(1) };

		await db.collection("games").doc(gameId).update({ teams });
		setLoading(false);
		props.setVisible(false);
	};

	return (
		<ModalTransition>
			{props.visible && (
				<Modal onClose={() => props.setVisible(false)} isChromeless>
					<div className="modal">
						<div className="modal-content">
							<h2 className="sub-heading">Create Teams</h2>
							<br />
							<div className="flex-container">
								<div className="input-wrapper">
									<Textfield
										value={teamA}
										onChange={handleTextInput(0)}
										className="input"
										placeholder={`ENTER TEAM A NAME`}
									/>
								</div>
								<div className="input-wrapper">
									<Textfield
										value={teamB}
										onChange={handleTextInput(1)}
										className="input"
										placeholder={`ENTER TEAM B NAME`}
									/>
								</div>
							</div>
							<Button
								className="button"
								appearance="primary"
								onClick={createTeams}
								isDisabled={loading || !teamA || !teamB}
								isLoading={loading}
							>
								Create Teams
							</Button>
						</div>
					</div>
				</Modal>
			)}
		</ModalTransition>
	);
};
