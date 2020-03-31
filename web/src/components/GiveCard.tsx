import Button from "@atlaskit/button";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

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
			player => player.name === gameData.lastMove.by
		);

		await db
			.collection("games")
			.doc(gameId)
			.collection("players")
			.doc(user.email)
			.update({
				cards: firebase.firestore.FieldValue.arrayRemove(gameData.lastMove.card)
			});

		await db
			.collection("games")
			.doc(gameId)
			.collection("players")
			.doc(takingPlayer?.id)
			.update({
				cards: firebase.firestore.FieldValue.arrayUnion(gameData.lastMove.card)
			});

		await db
			.collection("games")
			.doc(gameId)
			.update({ lastMove: { type: "TURN", turn: takingPlayer?.name } });

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
