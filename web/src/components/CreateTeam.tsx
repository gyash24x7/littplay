import Button from "@atlaskit/button";
import Modal, { ModalTransition } from "@atlaskit/modal-dialog";
import Select from "@atlaskit/select";
import Textfield from "@atlaskit/textfield";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { Team } from "../typings";
import { db } from "../utils/firebase";


interface SelectOption {
	label: string;
	value: string;
}

interface CreateTeamProps {
	visible: boolean;
	setVisible: (val: boolean) => void;
	players: string[];
}

export const CreateTeams = (props: CreateTeamProps) => {
	const { gameId } = useParams();

	const [loading, setLoading] = useState(false);
	const [teams, setTeams] = useState<string[]>([]);
	const [teamMembers, setTeamMembers] = useState<string[][]>([[], []]);
	const [playerData, setPlayerData] = useState(props.players);

	const handleSelection = (index: number) => (opts: SelectOption[]) => {
		let members = [...teamMembers];
		members[index] = opts.map((opt) => opt.value);
		setTeamMembers(members);

		setPlayerData(
			playerData.filter((player) => !members.flat().includes(player))
		);
	};

	const handleTextInput = (index: number) => (e: any) => {
		e.persist();
		let teamNames = [...teams];
		teamNames[index] = e.target.value;
		setTeams(teamNames);
	};

	const createTeams = async () => {
		setLoading(true);
		let teamData: Record<string, Team> = {};
		teamData[teams[0]] = { score: 0, members: teamMembers[0] };
		teamData[teams[1]] = { score: 0, members: teamMembers[1] };

		await db.collection("games").doc(gameId).update({ teams: teamData });
		setLoading(false);
	};

	return (
		<ModalTransition>
			{props.visible && (
				<Modal onClose={() => props.setVisible(false)} isChromeless>
					<div className="modal">
						<div className="modal-content">
							<h2 className="sub-heading">Create Team</h2>
							{[0, 1].map((i) => (
								<div key={i} className="flex-container">
									<h4>Team {i + 1}</h4>
									<div className="input-wrapper">
										<Textfield
											value={teams[i]}
											onChange={handleTextInput(1)}
											className="input"
											placeholder={`ENTER TEAM ${i} NAME`}
										/>
									</div>
									<Select
										data={playerData.map((name) => ({
											label: name,
											value: name
										}))}
										placeholder="Select Team Member"
										className="select"
										isMulti
										value={teamMembers[i].map((name) => ({
											label: name,
											value: name
										}))}
										onChange={handleSelection(i) as any}
									/>
								</div>
							))}
							<Button
								className="button"
								appearance="primary"
								onClick={createTeams}
								isDisabled={loading}
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
