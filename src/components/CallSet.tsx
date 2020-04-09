import Button from "@atlaskit/button";
import Modal, { ModalTransition } from "@atlaskit/modal-dialog";
import Select from "@atlaskit/select";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { GameCard, GameModalProps } from "../typings";
import { getTeamName, RANKS } from "../utils/constants";
import { GameContext, UserContext } from "../utils/context";
import { db } from "../utils/firebase";

export const CallSet = (props: GameModalProps) => {
	const { user } = useContext(UserContext);
	const { gameId } = useParams();
	const gameData = useContext(GameContext)!;

	const players = gameData.players;
	let myTeam = gameData.teams[getTeamName(user.name, gameData.teams)];
	let oppTeam = gameData.teams[getTeamName(user.name, gameData.teams, true)];

	const teamMembers = myTeam.members;
	const turnTransfer = oppTeam.members[0];

	const validCardSets = new Set(players[user.name].map((card) => card.set));
	const setWiseCards: Record<string, GameCard[]> = {};

	Array.from(validCardSets).forEach((set) => {
		setWiseCards[set] = [];
	});

	players[user.name].forEach((card) => {
		setWiseCards[card.set].push(card);
	});

	const setData = Array.from(validCardSets)
		.map((set) => ({ label: set, value: set }))
		.filter(({ value }) => setWiseCards[value].length > 0);

	const [selectedSet, setSelectedSet] = useState("");
	const [rankData, setRankData] = useState<string[]>([]);

	let initialCallData: Record<string, string[]> = {};
	teamMembers.forEach((player) => {
		initialCallData[player] = [];
	});

	const [callData, setCallData] = useState(initialCallData);
	const [loading, setLoading] = useState(false);

	const checkCardCall = () => {
		let cardsFound = 0;
		let playerData = { ...players };

		Object.keys(callData).forEach((member) => {
			const memberRanks = callData[member];
			memberRanks.forEach((rank) => {
				let index = players[member].findIndex(
					(card) => card.rank === rank && card.set === selectedSet
				);

				if (index >= 0) {
					cardsFound++;
				}
			});
		});

		if (cardsFound === 6) {
			myTeam.score++;
		} else {
			oppTeam.score++;
		}

		Object.keys(gameData.teams)
			.flatMap((team) => gameData.teams[team].members)
			.forEach((member) => {
				playerData[member] = playerData[member].filter(
					(card) => card.set !== selectedSet
				);
			});

		const teamData = {} as any;
		teamData[getTeamName(user.name, gameData.teams)] = myTeam;
		teamData[getTeamName(user.name, gameData.teams, true)] = oppTeam;

		return {
			players: playerData,
			status: cardsFound === 6 ? "CORRECT" : "INCORRECT",
			teams: teamData
		};
	};

	const handleCalling = async () => {
		setLoading(true);

		const { players, status, teams } = checkCardCall();

		await db
			.collection("games")
			.doc(gameId)
			.update({
				currentMove: "CALL",
				askData: null,
				players,
				turn: null,
				callData: {
					calledBy: user.name,
					calledSet: selectedSet,
					status
				},
				teams
			})
			.then(() => {
				setTimeout(async () => {
					await db
						.collection("games")
						.doc(gameId)
						.update({
							callData: null,
							askData: null,
							currentMove: "TURN",
							turn: status === "CORRECT" ? user.name : turnTransfer
						});
				}, 2000);
			})
			.catch((err) => console.log("Error: ", err));

		setLoading(false);
		props.setVisible(false);
	};

	const handleRankSelection = (player: string) => (opts: any) => {
		let temp = { ...callData };
		temp[player] = opts.map((opt: any) => opt.value);
		setCallData(temp);
	};

	const handleSetSelection = ({ value }: any) => {
		let VALID_RANKS = [] as string[];
		if (value.indexOf("Small") >= 0)
			VALID_RANKS = Object.keys(RANKS).slice(0, 6);
		else VALID_RANKS = Object.keys(RANKS).slice(7);

		setRankData(VALID_RANKS);
		setSelectedSet(value);
	};

	return (
		<ModalTransition>
			{props.visible && (
				<Modal onClose={() => props.setVisible(false)} isChromeless>
					<div className="modal">
						<div className="modal-content">
							<h2 className="sub-heading">Call Set</h2>
							<br />
							<Select
								className="select"
								options={setData}
								placeholder="Select Card Set to Call"
								value={
									selectedSet
										? { label: selectedSet, value: selectedSet }
										: null
								}
								onChange={handleSetSelection}
							/>
							<br />
							{teamMembers.map((member) => (
								<div>
									<h4 className="paragraph">{member}</h4>
									<Select
										className="select"
										options={rankData.map((rank) => ({
											label: rank,
											value: rank
										}))}
										isMulti
										isDisabled={!selectedSet}
										placeholder="Select Card Rank to Ask"
										onChange={handleRankSelection(member)}
										value={callData[member].map((rank) => ({
											label: rank,
											value: rank
										}))}
									/>
								</div>
							))}
							<Button
								isDisabled={
									Object.keys(callData).flatMap((player) => callData[player])
										.length !== 6
								}
								className="button"
								onClick={handleCalling}
								isLoading={loading}
								appearance={"primary"}
							>
								Call
							</Button>
						</div>
					</div>
				</Modal>
			)}
		</ModalTransition>
	);
};
