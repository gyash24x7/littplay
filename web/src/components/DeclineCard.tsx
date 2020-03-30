import { Button } from "@ui-kitten/components";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import styles from "../styles";
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
			.update({ lastMove: { type: "TURN", turn: user.displayName } });

		setLoading(false);
	};

	return (
		<Button style={styles.button} onPress={declineCard} disabled={haveCard}>
			{loading ? "Loading..." : "Decline"}
		</Button>
	);
};
