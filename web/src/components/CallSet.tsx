import Button from "@atlaskit/button";
import Modal, { ModalTransition } from "@atlaskit/modal-dialog";
import Select from "@atlaskit/select";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { GameCard, User } from "../typings";
import { RANKS } from "../utils/constants";
import { db } from "../utils/firebase";

interface CallSetProps {
	visible: boolean;
	setVisible: (val: boolean) => void;
	team: string[];
	players: Record<string, GameCard[]>;
	turnTransfer: string;
}

export const CallSet = (props: CallSetProps) => {
	const user: User = JSON.parse(localStorage.getItem("user")!);
	const { gameId } = useParams();

	const validCardSets = new Set(
		props.players[user.name].map((card) => card.set)
	);
	const setWiseCards: Record<string, GameCard[]> = {};

	Array.from(validCardSets).forEach((set) => {
		setWiseCards[set] = [];
	});

	props.players[user.name].forEach((card) => {
		setWiseCards[card.set].push(card);
	});

	const setData = Array.from(validCardSets)
		.map((set) => ({ label: set, value: set }))
		.filter(({ value }) => setWiseCards[value].length > 0);

	const [selectedSet, setSelectedSet] = useState("");
	const [rankData, setRankData] = useState<string[]>([]);

	let initialCallData: Record<string, string[]> = {};
	props.team.forEach((player) => {
		initialCallData[player] = [];
	});

	const [callData, setCallData] = useState(initialCallData);
	const [loading, setLoading] = useState(false);

	const checkCardCall = () => {
		let cardsFound = 0;
		let playerData = { ...props.players };

		Object.keys(callData).forEach((member) => {
			const memberRanks = callData[member];
			memberRanks.forEach((rank) => {
				let index = props.players[member].findIndex(
					(card) => card.rank === rank && card.set === selectedSet
				);

				if (index >= 0) {
					cardsFound++;
					playerData[member] = playerData[member].filter(
						(card) => card.rank !== rank || card.set !== selectedSet
					);
				}
			});
		});

		return {
			players: playerData,
			status: cardsFound === 6 ? "CORRECT" : "INCORRECT"
		};
	};

	const handleCalling = async () => {
		setLoading(true);

		const { players, status } = checkCardCall();

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
				}
			})
			.then(async () => {
				await db
					.collection("games")
					.doc(gameId)
					.update({
						callData: null,
						askData: null,
						currentMove: "TURN",
						turn: status === "CORRECT" ? user.name : props.turnTransfer
					});
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
							{props.team.map((member) => (
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
