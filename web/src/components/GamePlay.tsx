import { Button, Layout, Text } from "@ui-kitten/components";
import React, { Fragment, useState } from "react";

import styles from "../styles";
import { Game, Player, User } from "../typings";
import { GameCard } from "../utils/deck";
import { AskPlayer } from "./AskPlayer";
import { DeclineCard } from "./DeclineCard";
import { GiveCard } from "./GiveCard";

interface GamePlayProps {
	players: Player[];
	gameData: Game;
}

export const GamePlay = ({ gameData, players }: GamePlayProps) => {
	const [visible, setVisible] = useState(false);

	const user: User = JSON.parse(localStorage.getItem("user")!);

	const activePlayer: Player = players.find(
		player => player.id === user.email
	)!;

	let moveDescription = "";
	switch (gameData.lastMove.type) {
		case "TURN":
			moveDescription = `${gameData.lastMove.turn}'s Turn`;
			break;

		case "ASK":
			moveDescription = `${gameData.lastMove.by} asked ${
				gameData.lastMove.from
			} for ${GameCard.toString(gameData.lastMove.card!)}`;
			break;
	}

	const haveCard: boolean = !!(
		gameData &&
		players.length > 0 &&
		activePlayer &&
		activePlayer.cards &&
		activePlayer.cards.findIndex(card => {
			const rank = gameData.lastMove.card?.rank;
			const suit = gameData.lastMove.card?.suit;
			return card.suit === suit && card.rank === rank;
		}) > -1
	);

	return (
		<Layout style={styles.gamePlayContainer}>
			{gameData && players.length > 0 && (
				<Fragment>
					<Layout style={styles.moveAction}>
						<Text>{moveDescription}</Text>
					</Layout>
					{gameData.lastMove.turn === user.displayName && (
						<Layout style={styles.moveAction}>
							<Button onPress={() => setVisible(true)}>Ask Player</Button>
							<AskPlayer
								visible={visible}
								setVisible={setVisible}
								players={players}
								activePlayer={activePlayer}
							/>
						</Layout>
					)}
					{gameData.lastMove.from === user.displayName && (
						<Layout style={styles.moveAction}>
							<GiveCard
								players={players}
								haveCard={haveCard}
								gameData={gameData}
							/>
							<DeclineCard haveCard={haveCard} />
						</Layout>
					)}
				</Fragment>
			)}
		</Layout>
	);
};
