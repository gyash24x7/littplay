import Button from "@atlaskit/button";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { User } from "../typings";
import { db } from "../utils/firebase";

interface DeclineCardProps {
	haveCard: boolean;
}

export const DeclineCard = ({ haveCard }: DeclineCardProps) => {
	const [loading, setLoading] = useState(false);
	const { gameId } = useParams();
	const user: User = JSON.parse(localStorage.getItem("user")!);

	const declineCard = async () => {
		setLoading(true);

		await db
			.collection("games")
			.doc(gameId)
			.update({ currentMove: "TURN", turn: user.name });

		setLoading(false);
	};

	return (
		<Button
			className="button"
			onClick={declineCard}
			isDisabled={haveCard}
			isLoading={loading}
			appearance="danger"
		>
			Decline
		</Button>
	);
};