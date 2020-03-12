import { Button, Layout, Modal, Text } from "@ui-kitten/components";
import React from "react";
import { useHistory } from "react-router-dom";

import styles from "../styles";

interface CreateGameProps {
	visible: boolean;
	setVisible: (val: boolean) => void;
	gameId?: string;
}

export const CreateGame = ({
	visible,
	setVisible,
	gameId = "ACEGHD"
}: CreateGameProps) => {
	const toggleModal = () => {
		setVisible(!visible);
	};

	const history = useHistory();

	return (
		<Modal
			backdropStyle={styles.backdrop}
			onBackdropPress={toggleModal}
			visible={visible}
		>
			<Layout style={styles.card}>
				<Text style={styles.paragraph}>Your Game ID is</Text>
				<Text style={styles.heading}>{gameId}</Text>
				<Text style={styles.paragraph}>
					Ask Players to join the game with this ID
				</Text>
				<Button
					style={styles.button}
					onPress={() => history.push(`/play/${gameId}`)}
				>
					Join Game
				</Button>
			</Layout>
		</Modal>
	);
};
