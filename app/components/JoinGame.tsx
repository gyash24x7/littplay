import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { TextInput, View } from "react-native";
import { Button, Modal, Portal } from "react-native-paper";

import styles from "../styles";
import { Game } from "../typings";
import { UserContext } from "../utils/context";
import { db } from "../utils/firebase";

interface JoinGameProps {
	visible: boolean;
	setVisible: (val: boolean) => void;
}

export const JoinGame = (props: JoinGameProps) => {
	const [gameId, setGameId] = useState("");
	const [loading, setLoading] = useState(false);

	const { user } = useContext(UserContext);

	const handleTextChange = (text: string) => {
		if (text.length < 7) {
			setGameId(text.toUpperCase());
		}
	};

	const navigation = useNavigation();

	const goToGame = async () => {
		setLoading(true);

		const data: Game = (
			await db.collection("games").doc(gameId).get()
		).data() as any;

		let gameUpdate: any = {};
		gameUpdate[`players.${user.name}`] = [];

		if (!data.players[user.name]) {
			await db.collection("games").doc(gameId).update(gameUpdate);
		}

		setLoading(false);
		navigation.navigate("Game");
	};

	return (
		<Portal>
			<Modal visible={props.visible} onDismiss={() => props.setVisible(false)}>
				<View style={styles.modal}>
					<View style={styles.modalContent}>
						<TextInput
							style={styles.input}
							onChangeText={handleTextChange}
							placeholder="ENTER GAME ID"
							value={gameId}
							autoCapitalize="characters"
						/>
						<Button
							mode="contained"
							onPress={goToGame}
							style={styles.button}
							loading={loading}
						>
							{!loading && "Join Game"}
						</Button>
					</View>
				</View>
			</Modal>
		</Portal>
	);
};
