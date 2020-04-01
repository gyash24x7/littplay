import { Button } from "@ui-kitten/components";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import styles from "../styles";
import { Game, Player, User } from "../typings";
import firebase, { db } from "../utils/firebase";

interface GiveCardProps {
	players: Player[];
	gameData: Game;
	haveCard: boolean;
}

export const GiveCard = ({ players, gameData, haveCard }: GiveCardProps) => {
	const [loading, setLoading] = useState(false);
	const { gameId } = useParams();
	const user: User = JSON.parse(localStorage.getItem("user")!);

	const giveCard = async () => {
		setLoading(true);
		const takingPlayer = players.find(
			player => player.name === gameData.currentMove.by
		);

		await db
			.collection("games")
			.doc(gameId)
			.collection("players")
			.doc(user.email)
			.update({
				cards: firebase.firestore.FieldValue.arrayRemove(
					gameData.currentMove.card
				)
			});

		await db
			.collection("games")
			.doc(gameId)
			.collection("players")
			.doc(takingPlayer?.id)
			.update({
				cards: firebase.firestore.FieldValue.arrayUnion(
					gameData.currentMove.card
				)
			});

		await db
			.collection("games")
			.doc(gameId)
			.update({ currentMove: { type: "TURN", turn: takingPlayer?.name } });

		setLoading(false);
	};

	return (
		<Button style={styles.button} onPress={giveCard} disabled={!haveCard}>
			{loading ? "Loading..." : "Give Card"}
		</Button>
	);
};
