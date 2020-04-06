import Button from "@atlaskit/button";
import Modal, { ModalTransition } from "@atlaskit/modal-dialog";
import Select from "@atlaskit/select";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { GameCard, User } from "../typings";
import { RANKS } from "../utils/constants";
import { db } from "../utils/firebase";

interface AskPlayerProps {
	visible: boolean;
	setVisible: (val: boolean) => void;
	team: string[];
	players: Record<string, GameCard[]>;
}

export const AskPlayer = (props: AskPlayerProps) => {
	const user: User = JSON.parse(localStorage.getItem("user")!);
	const { gameId } = useParams();

	const playerData = Object.keys(props.players)
		.filter((name) => props.team.includes(name))
		.map((name) => ({
			label: `${name} (${props.players[name]?.length} cards left)`,
			value: name
		}));

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

	const [selectedPlayer, setSelectedPlayer] = useState("");
	const [selectedSet, setSelectedSet] = useState("");
	const [rankData, setRankData] = useState<string[]>([]);
	const [selectedRank, setSelectedRank] = useState("");
	const [loading, setLoading] = useState(false);

	const handleAsking = async () => {
		setLoading(true);
		await db
			.collection("games")
			.doc(gameId)
			.update({
				currentMove: "ASK",
				askData: {
					askedBy: user.name,
					askedFor: {
						rank: selectedRank,
						suit: selectedSet.split(" ")[1],
						set: selectedSet
					},
					askedFrom: selectedPlayer
				}
			})
			.catch((err) => console.log("Error: ", err));

		setLoading(false);
		props.setVisible(false);
	};

	const handleSelection = (field: string) => ({ value }: any) => {
		switch (field) {
			case "Player":
				setSelectedPlayer(value);
				break;

			case "Rank":
				setSelectedRank(value);
				break;

			case "Set":
				let VALID_RANKS = [] as string[];
				if (value.indexOf("Small") >= 0)
					VALID_RANKS = Object.keys(RANKS).slice(0, 6);
				else VALID_RANKS = Object.keys(RANKS).slice(7);

				setRankData(
					VALID_RANKS.filter(
						(rank) =>
							setWiseCards[value].findIndex(
								(card) => card.rank === rank && value === card.set
							) === -1
					)
				);

				setSelectedSet(value);
				break;
		}
	};

	console.log(playerData);

	return (
		<ModalTransition>
			{props.visible && (
				<Modal onClose={() => props.setVisible(false)} isChromeless>
					<div className="modal">
						<div className="modal-content">
							<h2 className="sub-heading">Ask</h2>
							<br />
							<Select
								data={playerData}
								placeholder="Select Whom to Ask"
								className="select"
								onChange={handleSelection("Player")}
								value={
									selectedPlayer
										? { label: selectedPlayer, value: selectedPlayer }
										: null
								}
							/>
							<Select
								className="select"
								data={setData}
								placeholder="Select Card Set to Ask"
								value={
									selectedSet
										? { label: selectedSet, value: selectedSet }
										: null
								}
								onChange={handleSelection("Set")}
							/>
							<Select
								className="select"
								data={rankData}
								placeholder="Select Card Rank to Ask"
								value={
									selectedRank
										? { label: selectedRank, value: selectedRank }
										: null
								}
								onChange={handleSelection("Rank")}
							/>
							<Button
								isDisabled={!selectedPlayer || !selectedRank}
								className="button"
								onClick={handleAsking}
								isLoading={loading}
								appearance={"primary"}
							>
								Ask
							</Button>
						</div>
					</div>
				</Modal>
			)}
		</ModalTransition>
	);
};
