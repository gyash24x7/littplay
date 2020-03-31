import Button from "@atlaskit/button";
import Flag from "@atlaskit/flag";
import TickIcon from "@atlaskit/icon/glyph/check-circle";
import Spinner from "@atlaskit/spinner";
import { colors } from "@atlaskit/theme";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Logo from "../assets/icon.png";
import { GameCardComponent } from "../components/GameCard";
import { GamePlay } from "../components/GamePlay";
import { Game, Player, User } from "../typings";
import { GameCard } from "../utils/deck";
import { db } from "../utils/firebase";

export const GameScreen = () => {
	const { gameId } = useParams();
	const [players, setPlayers] = useState<Player[]>([]);
	const [gameData, setGameData] = useState<Game>();
	const [loading, setLoading] = useState(false);
	const user: User = JSON.parse(localStorage.getItem("user")!);

	const activePlayer =
		players.length > 0
			? players.find(player => player.id === user.email)
			: undefined;

	const startGame = async () => {
		setLoading(true);

		await db
			.collection("games")
			.doc(gameId)
			.update({
				started: true,
				lastMove: { type: "TURN", turn: user.displayName }
			});

		players.forEach(async (player, index) => {
			await db
				.collection("games")
				.doc(gameId)
				.collection("players")
				.doc(player.id)
				.update({ cards: gameData?.deck.slice(8 * index, 8 * index + 8) });
		});

		setLoading(false);
	};

	useEffect(() => {
		const unsubscribeFromGame = db
			.collection("games")
			.doc(gameId)
			.onSnapshot(snapshot => {
				if (snapshot.exists) {
					setGameData(snapshot.data() as any);
				}
			});

		const unsubscribeFromPlayers = db
			.collection("games")
			.doc(gameId)
			.collection("players")
			.onSnapshot(snapshot => {
				if (!snapshot.empty) {
					const players = snapshot.docs.map(doc => {
						let data = doc.data();
						return {
							name: data.name,
							id: doc.id,
							cards: data.cards as GameCard[]
						};
					});
					setPlayers(players);
				}
			});

		return () => {
			unsubscribeFromGame();
			unsubscribeFromPlayers();
		};
	}, [gameId]);

	return (
		<div className="wrapper">
			<div className="logo-mark">
				<img src={Logo} alt="" />
				{!gameData && <Spinner />}
			</div>
			{gameData && !gameData.started && (
				<div className="card">
					{players.map(player => (
						<div className="flag-wrapper" key={player.id}>
							<Flag
								appearance="success"
								title={`${player.name} Joined`}
								isDismissAllowed={false}
								id={player.id}
								icon={
									<TickIcon label="Check Icon" secondaryColor={colors.G400} />
								}
							/>
						</div>
					))}
					{players.length === 2 && (
						<Button
							appearance="primary"
							className="button"
							isDisabled={loading}
							onClick={startGame}
							isLoading={loading}
						>
							Start Game
						</Button>
					)}
				</div>
			)}
			{gameData && gameData.started && (
				<Fragment>
					<div className="playing-card-container">
						{activePlayer?.cards?.map(card => (
							<GameCardComponent card={card} key={card.rank + card.suit} />
						))}
					</div>
					<GamePlay
						gameData={gameData}
						players={players}
						activePlayer={activePlayer}
					/>
				</Fragment>
			)}
			<div className="bottom-text">Logged in as {user.email}</div>
		</div>
	);
};
