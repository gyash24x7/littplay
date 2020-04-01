import {
  Button,
  Layout,
  Modal,
  Select,
  SelectOptionType,
  Text,
} from "@ui-kitten/components";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import styles from "../styles";
import { Player, User } from "../typings";
import { BIG_RANKS, SMALL_RANKS } from "../utils/constants";
import { Deck } from "../utils/deck";
import { db } from "../utils/firebase";

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
			text: `${player.name} (${player.cards?.length} cards left)`
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
		.flatMap(suit => [{ text: `Small ${suit}` }, { text: `Big ${suit}` }])
		.filter(({ text }) => setWiseCards[text].length > 0);

	const [selectedPlayer, setSelectedPlayer] = useState<SelectOptionType>();
	const [selectedSet, setSelectedSet] = useState<SelectOptionType>();
	const [rankData, setRankData] = useState<SelectOptionType[]>([]);
	const [selectedRank, setSelectedRank] = useState<SelectOptionType>();
	const [loading, setLoading] = useState(false);

	const handleSelectedSetSelection = ({ text }: SelectOptionType) => {
		let VALID_RANKS = [] as string[];
		if (text.split(" ")[0] === "Small") VALID_RANKS = SMALL_RANKS;
		else VALID_RANKS = BIG_RANKS;

		setRankData(
			VALID_RANKS.filter(
				rank =>
					setWiseCards[text].findIndex(
						card => card.rank === rank && card.suit === text.split(" ")[1]
					) === -1
			).map(text => ({ text }))
		);

		setSelectedSet({ text });
	};

	const handleAsking = async () => {
		setLoading(true);
		await db
			.collection("games")
			.doc(gameId)
			.update({
				currentMove: {
					type: "ASK",
					from: selectedPlayer?.text.split(" (")[0],
					by: user.displayName,
					card: {
						rank: selectedRank?.text,
						suit: selectedSet?.text.split(" ")[1]
					}
				}
			})
			.catch(err => console.log("Error: ", err));

		setLoading(false);
		toggleModal();
	};

	return (
		<Modal
			backdropStyle={styles.backdrop}
			onBackdropPress={toggleModal}
			visible={props.visible}
		>
			<Layout style={styles.modal}>
				<Text style={styles.paragraph}>Ask</Text>
				<Select
					data={playerData}
					onSelect={setSelectedPlayer as any}
					placeholder="Select Whom to Ask"
					style={styles.select}
					selectedOption={selectedPlayer}
				/>
				<Select
					data={setData}
					onSelect={handleSelectedSetSelection as any}
					placeholder="Select Card Set to Ask"
					style={styles.select}
					selectedOption={selectedSet}
				/>
				<Select
					data={rankData}
					onSelect={setSelectedRank as any}
					placeholder="Select Card Rank to Ask"
					style={styles.select}
					disabled={!selectedSet}
					selectedOption={selectedRank}
				/>
				<Button
					disabled={!selectedPlayer || !selectedRank}
					style={styles.button}
					onPress={handleAsking}
				>
					{loading ? "Loading..." : "Ask"}
				</Button>
			</Layout>
		</Modal>
	);
};
