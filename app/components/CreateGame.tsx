import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { View } from "react-native";
import {
  Button,
  Headline,
  Modal,
  Portal,
  Subheading,
} from "react-native-paper";

import styles from "../styles";
import { UserContext } from "../utils/context";
import { db } from "../utils/firebase";

interface CreateGameProps {
	visible: boolean;
	setVisible: (val: boolean) => void;
	gameId: string;
}

export const CreateGame = (props: CreateGameProps) => {
	const [loading, setLoading] = useState(false);
	const { user } = useContext(UserContext);

	const navigation = useNavigation();

	const goToGame = async () => {
		setLoading(true);
		let gameUpdate: any = {};
		gameUpdate[`players.${user?.name}`] = [];

		await db.collection("games").doc(props.gameId).update(gameUpdate);

		setLoading(false);
		navigation.navigate("Game");
	};

	return (
		<Portal>
			<Modal visible={props.visible} onDismiss={() => props.setVisible(false)}>
				<View style={styles.modal}>
					<View style={styles.modalContent}>
						<Subheading style={styles.paragraph}>Your Game ID is</Subheading>
						<Headline style={styles.heading}>{props.gameId}</Headline>
						<Subheading style={styles.paragraph}>
							Ask Players to join the game with this ID
						</Subheading>
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
