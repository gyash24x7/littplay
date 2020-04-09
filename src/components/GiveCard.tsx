import Button from "@atlaskit/button";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { GameContext, UserContext } from "../utils/context";
import { db } from "../utils/firebase";

interface GiveCardProps {
	haveCard: boolean;
}

export const GiveCard = ({ haveCard }: GiveCardProps) => {
	const [loading, setLoading] = useState(false);
	const { gameId } = useParams();
	const { user } = useContext(UserContext);
	const gameData = useContext(GameContext)!;

	const giveCard = async () => {
		setLoading(true);

		const { players, askData, ...data } = gameData;

		players[user.name] = players[user.name].filter(
			({ rank, suit }) =>
				rank !== askData!.askedFor.rank || suit !== askData!.askedFor.suit
		);

		players[askData!.askedBy].push(askData!.askedFor);

		await db
			.collection("games")
			.doc(gameId)
			.update({
				...data,
				players,
				currentMove: "TURN",
				turn: askData!.askedBy,
				askData: null,
				callData: null
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
