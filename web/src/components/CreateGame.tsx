import { Button, Layout, Modal, Text } from "@ui-kitten/components";
import React from "react";
import { useHistory } from "react-router-dom";

import styles from "../styles";
import { User } from "../typings";
import { db } from "../utils/firebase";

interface CreateGameProps {
	visible: boolean;
	setVisible: (val: boolean) => void;
	gameId: string;
}

export const CreateGame = (props: CreateGameProps) => {
	const toggleModal = () => {
		props.setVisible(!props.visible);
	};

	const user: User = JSON.parse(localStorage.getItem("user")!);

	const history = useHistory();
	const goToGame = async () => {
		await db
			.collection("games")
			.doc(props.gameId)
			.collection("players")
			.doc(user.email)
			.set({ name: user.displayName });
		history.push(`/play/${props.gameId}`);
	};

	return (
		<Modal
			backdropStyle={styles.backdrop}
			onBackdropPress={toggleModal}
			visible={props.visible}
		>
			<Layout style={styles.card}>
				<Text style={styles.paragraph}>Your Game ID is</Text>
				<Text style={styles.heading}>{props.gameId}</Text>
				<Text style={styles.paragraph}>
					Ask Players to join the game with this ID
				</Text>
				<Button style={styles.button} onPress={goToGame}>
					Join Game
				</Button>
			</Layout>
		</Modal>
	);
};
