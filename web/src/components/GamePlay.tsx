import { Button, Layout, Text } from "@ui-kitten/components";
import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "../styles";
import { Game, Player, User } from "../typings";
import { GameCard } from "../utils/deck";
import firebase, { db } from "../utils/firebase";
import { AskPlayer } from "./AskPlayer";

// import {FieldValue} from 'firebase/firestore'
interface GamePlayProps {
	players: Player[];
	gameData: Game;
}

export const GamePlay = ({ gameData, players }: GamePlayProps) => {
	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);

	const user: User = JSON.parse(localStorage.getItem("user")!);
	const { gameId } = useParams();

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

	const giveCard = async () => {
		setLoading(true);

		await db
			.collection("games")
			.doc(gameId)
			.collection("players")
			.doc(user.email)
			.update({
				cards: firebase.firestore.FieldValue.arrayRemove(gameData.lastMove.card)
			});

		await db
			.collection("games")
			.doc(gameId)
			.collection("players")
			.doc(players.find(player => player.name === gameData.lastMove.by)?.id)
			.update({
				cards: firebase.firestore.FieldValue.arrayUnion(gameData.lastMove.card)
			});

		setLoading(false);
	};

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
							<Button style={styles.button} onPress={giveCard}>
								{loading ? "Loading..." : "Give Card"}
							</Button>
							<Button
								style={styles.button}
								disabled={
									activePlayer.cards!.findIndex(card => {
										const rank = gameData.lastMove.card?.rank;
										const suit = gameData.lastMove.card?.suit;
										return card.suit === suit && card.rank === rank;
									}) > -1
								}
							>
								Decline
							</Button>
						</Layout>
					)}
				</Fragment>
			)}
		</Layout>
	);
};
