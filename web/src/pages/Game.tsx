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
import { Game, Player } from "../typings";
import { db } from "../utils/firebase";

export const GameScreen = () => {
	const { gameId } = useParams();
	const [gameData, setGameData] = useState<Game>();
	const [loading, setLoading] = useState(false);
	const user: Player = JSON.parse(localStorage.getItem("user")!);

	const activePlayer = gameData?.players.find(
		player => player.email === user.email
	);

	const startGame = async () => {
		setLoading(true);

		const players = gameData?.players.map((player, index) => ({
			...player,
			cards: gameData.deck.slice(index * 8, index * 8 + 8)
		}));

		await db
			.collection("games")
			.doc(gameId)
			.update({
				started: true,
				currentMove: { type: "TURN", turn: user.name },
				teams: {
					A: players?.slice(0, 3).map(player => player.email),
					B: players?.slice(3).map(player => player.email)
				},
				players
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

		return () => unsubscribeFromGame();
	}, [gameId]);

	return (
		<div className="wrapper">
			<div className="logo-mark">
				<img src={Logo} alt="" />
			</div>
			{!gameData && <Spinner />}
			{gameData && !gameData.started && (
				<div className="card">
					{gameData.players.map(player => (
						<div className="flag-wrapper" key={player.email}>
							<Flag
								appearance="success"
								title={player.name + " JOINED"}
								isDismissAllowed={false}
								id={player.email}
								icon={
									<TickIcon label="Check Icon" secondaryColor={colors.G400} />
								}
							/>
						</div>
					))}
					{gameData.players.length === 6 && (
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
					<GamePlay gameData={gameData} activePlayer={activePlayer} />
				</Fragment>
			)}
			<h4 className="paragraph">Logged in as {user.email}</h4>
		</div>
	);
};
