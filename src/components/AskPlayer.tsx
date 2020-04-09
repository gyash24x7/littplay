import Button from "@atlaskit/button";
import Modal, { ModalTransition } from "@atlaskit/modal-dialog";
import Select from "@atlaskit/select";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { GameCard, GameModalProps } from "../typings";
import { getTeamName, RANKS } from "../utils/constants";
import { GameContext, UserContext } from "../utils/context";
import { db } from "../utils/firebase";

export const AskPlayer = (props: GameModalProps) => {
	const { user } = useContext(UserContext);
	const { gameId } = useParams();
	const gameData = useContext(GameContext)!;

	const players = gameData.players;
	const team =
		gameData.teams[getTeamName(user.name, gameData.teams, true)].members;

	const playerData = Object.keys(players)
		.filter((name) => team.includes(name))
		.map((name) => ({
			label: `${name} (${players[name]?.length} cards left)`,
			value: name
		}));

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
				},
				turn: null,
				callData: null
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

				console.log(
					VALID_RANKS.filter(
						(rank) =>
							setWiseCards[value].findIndex(
								(card) => card.rank === rank && value === card.set
							) === -1
					)
				);

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

	return (
		<ModalTransition>
			{props.visible && (
				<Modal onClose={() => props.setVisible(false)} isChromeless>
					<div className="modal">
						<div className="modal-content">
							<h2 className="sub-heading">Ask</h2>
							<br />
							<Select
								options={playerData}
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
								options={setData}
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
								options={rankData.map((rank) => ({ label: rank, value: rank }))}
								placeholder="Select Card Rank to Ask"
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
