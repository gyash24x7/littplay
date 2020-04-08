import Button from "@atlaskit/button";
import Modal, { ModalTransition } from "@atlaskit/modal-dialog";
import Textfield from "@atlaskit/textfield";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { Team } from "../typings";
import { db } from "../utils/firebase";

interface CreateTeamProps {
	visible: boolean;
	setVisible: (val: boolean) => void;
	players: string[];
}

export const CreateTeams = (props: CreateTeamProps) => {
	const { gameId } = useParams();
	const [loading, setLoading] = useState(false);
	const [teamA, setTeamA] = useState("");
	const [teamB, setTeamB] = useState("");

	const handleTextInput = (index: number) => (e: any) => {
		e.persist();
		if (index === 0) setTeamA(e.target.value.toUpperCase());
		else setTeamB(e.target.value.toUpperCase());
	};

	const createTeams = async () => {
		setLoading(true);
		let teams: Record<string, Team> = {};
		teams[teamA] = { score: 0, members: props.players.slice(0, 1) };
		teams[teamB] = { score: 0, members: props.players.slice(1) };

		await db.collection("games").doc(gameId).update({ teams });
		setLoading(false);
		props.setVisible(false);
	};

	return (
		<ModalTransition>
			{props.visible && (
				<Modal onClose={() => props.setVisible(false)} isChromeless>
					<View className="modal">
						<View className="modal-content">
							<Text className="sub-heading">Create Teams</Text>
							<br />
							<View className="flex-container">
								<View className="input-wrapper">
									<Textfield
										value={teamA}
										onChange={handleTextInput(0)}
										className="input"
										placeholder={`ENTER TEAM A NAME`}
									/>
								</View>
								<View className="input-wrapper">
									<Textfield
										value={teamB}
										onChange={handleTextInput(1)}
										className="input"
										placeholder={`ENTER TEAM B NAME`}
									/>
								</View>
							</View>
							<Button
								className="button"
								appearance="primary"
								onClick={createTeams}
								isDisabled={loading || !teamA || !teamB}
								isLoading={loading}
							>
								Create Teams
							</Button>
						</View>
					</View>
				</Modal>
			)}
		</ModalTransition>
	);
};
