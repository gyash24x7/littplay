import Button from "@atlaskit/button";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { Game, Player } from "../typings";
import firebase, { db } from "../utils/firebase";

interface GiveCardProps {
	gameData: Game;
	haveCard: boolean;
}

export const GiveCard = ({ gameData, haveCard }: GiveCardProps) => {
	const [loading, setLoading] = useState(false);
	const { gameId } = useParams();
	const user: Player = JSON.parse(localStorage.getItem("user")!);

	const giveCard = async () => {
		setLoading(true);
		const takingPlayer = gameData.players.find(
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
			.doc(takingPlayer?.email)
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
		<Button
			className="button"
			onClick={giveCard}
			isDisabled={!haveCard}
			isLoading={loading}
			appearance="primary"
		>
			Give Card
		</Button>
	);
};
