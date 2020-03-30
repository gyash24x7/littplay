import { Button, Input, Layout, Modal, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import styles from "../styles";
import { User } from "../typings";
import { db } from "../utils/firebase";

interface JoinGameProps {
	visible: boolean;
	setVisible: (val: boolean) => void;
}

export const JoinGame = (props: JoinGameProps) => {
	const [gameId, setGameId] = useState("");
	const [loading, setLoading] = useState(false);

	const toggleModal = () => {
		props.setVisible(!props.visible);
	};

	const user: User = JSON.parse(localStorage.getItem("user")!);

	const handleTextChange = (text: string) => {
		if (text.length < 7) {
			setGameId(text.toUpperCase());
		}
	};

	const history = useHistory();

	const goToGame = async () => {
		setLoading(true);

		await db
			.collection("games")
			.doc(gameId)
			.collection("players")
			.doc(user.email)
			.set({ name: user.displayName });

		setLoading(false);
		history.push(`/play/${gameId}`);
	};

	return (
		<Modal
			backdropStyle={styles.backdrop}
			onBackdropPress={toggleModal}
			visible={props.visible}
		>
			<Layout style={styles.modal}>
				<Text style={styles.labelStyle}>Enter Game ID</Text>
				<Input
					value={gameId}
					onChangeText={handleTextChange}
					textStyle={{ textAlign: "center" }}
				/>
				<Button style={styles.button} onPress={goToGame} disabled={loading}>
					{loading ? "Loading..." : "Join Game"}
				</Button>
			</Layout>
		</Modal>
	);
};
