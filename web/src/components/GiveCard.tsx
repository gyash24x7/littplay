import Button from "@atlaskit/button";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { Game, Player } from "../typings";
import { db } from "../utils/firebase";

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

		const { players, currentMove, ...data } = gameData;

		const takingPlayer = gameData.players.find(
			player => player.name === currentMove.by
		);

		players.forEach((player, index) => {
			if (player.email === user.email) {
				players[index].cards = player.cards!.filter(
					({ rank, suit }) =>
						rank !== currentMove.card?.rank || suit !== currentMove.card.suit
				);
			}

			if (player.email === takingPlayer?.email) {
				players[index].cards?.push(currentMove.card!);
			}
		});

		await db
			.collection("games")
			.doc(gameId)
			.update({
				...data,
				players,
				currentMove: { type: "TURN", turn: takingPlayer?.name }
			});

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
