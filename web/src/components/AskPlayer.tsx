import Button from "@atlaskit/button";
import Modal, { ModalTransition } from "@atlaskit/modal-dialog";
import Select from "@atlaskit/select";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { Player, User } from "../typings";
import { BIG_RANKS, SMALL_RANKS } from "../utils/constants";
import { Deck } from "../utils/deck";
import { db } from "../utils/firebase";

interface SelectOption {
	label: string;
	value: string;
}

interface AskPlayerProps {
	visible: boolean;
	setVisible: (val: boolean) => void;
	players: Player[];
	activePlayer?: Player;
}

export const AskPlayer = (props: AskPlayerProps) => {
	const user: User = JSON.parse(localStorage.getItem("user")!);
	const { gameId } = useParams();

	const playerData = props.players
		.filter(player => player.id !== user.email)
		.map(player => ({
			label: `${player.name} (${player.cards?.length} cards left)`,
			value: player.id
		}));

	const toggleModal = () => props.setVisible(!props.visible);

	const validCardSuits = new Set(
		props.activePlayer?.cards?.map(card => card.suit)
	);
	const setWiseCards = Deck.getSetWiseCards(
		props.activePlayer?.cards!,
		validCardSuits || []
	);

	const setData = Array.from(validCardSuits)
		.flatMap(suit => [
			{ label: `Small ${suit}`, value: `Small ${suit}` },
			{ label: `Big ${suit}`, value: `Big ${suit}` }
		])
		.filter(({ value }) => setWiseCards[value].length > 0);

	const [selectedPlayer, setSelectedPlayer] = useState<SelectOption>();
	const [selectedSet, setSelectedSet] = useState<SelectOption>();
	const [rankData, setRankData] = useState<SelectOption[]>([]);
	const [selectedRank, setSelectedRank] = useState<SelectOption>();
	const [loading, setLoading] = useState(false);

	const handleSelectedSetSelection = ({ value }: SelectOption) => {
		let VALID_RANKS = [] as string[];
		if (value.split(" ")[0] === "Small") VALID_RANKS = SMALL_RANKS;
		else VALID_RANKS = BIG_RANKS;

		setRankData(
			VALID_RANKS.filter(
				rank =>
					setWiseCards[value].findIndex(
						card => card.rank === rank && card.suit === value.split(" ")[1]
					) === -1
			).map(text => ({ label: text, value: text }))
		);

		setSelectedSet({ value, label: value });
	};

	const handleAsking = async () => {
		setLoading(true);
		await db
			.collection("games")
			.doc(gameId)
			.update({
				lastMove: {
					type: "ASK",
					from: selectedPlayer?.label.split(" (")[0],
					by: user.displayName,
					card: {
						rank: selectedRank?.value,
						suit: selectedSet?.value.split(" ")[1]
					}
				}
			})
			.catch(err => console.log("Error: ", err));

		setLoading(false);
		toggleModal();
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
								onChange={setSelectedPlayer as any}
							/>
							<Select
								className="select"
								options={setData}
								placeholder="Select Card Set to Ask"
								value={selectedSet}
								onChange={handleSelectedSetSelection as any}
							/>
							<Select
								className="select"
								options={rankData}
								placeholder="Select Card Rank to Ask"
								value={selectedRank}
								onChange={setSelectedRank as any}
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
