import Button from "@atlaskit/button";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { Game, User } from "../typings";
import { db } from "../utils/firebase";

interface GiveCardProps {
	gameData: Game;
	haveCard: boolean;
}

export const GiveCard = ({ gameData, haveCard }: GiveCardProps) => {
	const [loading, setLoading] = useState(false);
	const { gameId } = useParams();
	const user: User = JSON.parse(localStorage.getItem("user")!);

	const giveCard = async () => {
		setLoading(true);

		const { players, askData, ...data } = gameData;

		players[user.name] = players[user.name].filter(
			({ rank, suit }) =>
				rank !== askData!.askedFor.rank && suit === askData!.askedFor.suit
		);

		players[askData!.askedBy].push(askData!.askedFor);

		await db
			.collection("games")
			.doc(gameId)
			.update({
				...data,
				players,
				currentMove: "TURN",
				turn: askData!.askedBy
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
