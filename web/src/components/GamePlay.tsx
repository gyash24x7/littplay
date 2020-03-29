import { Button, Layout, Text } from "@ui-kitten/components";
import React, { useState } from "react";

import styles from "../styles";
import { Game, Player, User } from "../typings";
import { AskPlayer } from "./AskPlayer";

interface GamePlayProps {
	players: Player[];
	gameData: Game;
}

export const GamePlay = ({ gameData, players }: GamePlayProps) => {
	const [visible, setVisible] = useState(false);
	const user: User = JSON.parse(localStorage.getItem("user")!);
	const turnPlayerName = gameData.moves[0].split(": ")[1];

	return (
		<Layout style={styles.gamePlayContainer}>
			<Text>{gameData.moves[0]}</Text>
			{turnPlayerName === user.displayName && (
				<Button onPress={() => setVisible(true)}>Ask Player</Button>
			)}
			{gameData && players.length > 0 && (
				<AskPlayer
					visible={visible}
					setVisible={setVisible}
					players={players}
				/>
			)}
		</Layout>
	);
};
