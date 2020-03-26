import { Button, Input, Layout, Modal } from "@ui-kitten/components";
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
		await db
			.collection("games")
			.doc(gameId)
			.collection("players")
			.doc(user.email)
			.set({ name: user.displayName });

		history.push(`/play/${gameId}`);
	};

	return (
		<Modal
			backdropStyle={styles.backdrop}
			onBackdropPress={toggleModal}
			visible={props.visible}
		>
			<Layout style={styles.card}>
				<Input
					value={gameId}
					onChangeText={handleTextChange}
					textStyle={{ textAlign: "center" }}
					label="Enter gameId"
					labelStyle={styles.labelStyle}
				/>
				<Button style={styles.button} onPress={goToGame}>
					Join Game
				</Button>
			</Layout>
		</Modal>
	);
};
