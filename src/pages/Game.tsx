import Button from "@atlaskit/button";
import Flag from "@atlaskit/flag";
import TickIcon from "@atlaskit/icon/glyph/check-circle";
import Spinner from "@atlaskit/spinner";
import { colors } from "@atlaskit/theme";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Logo from "../assets/icon.png";
import { CreateTeams } from "../components/CreateTeam";
import { GameCardComponent } from "../components/GameCard";
import { GamePlay } from "../components/GamePlay";
import { Scoreboard } from "../components/Scoreboard";
import { Game } from "../typings";
import { getSortedHand, getTeamDescriptions } from "../utils/constants";
import { GameContext, UserContext } from "../utils/context";
import { db } from "../utils/firebase";

export const GameScreen = () => {
	const { gameId } = useParams();
	const [gameData, setGameData] = useState<Game>();
	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const { user } = useContext(UserContext);

	const startGame = async () => {
		setLoading(true);

		let gameUpdate: any = {};

		Object.keys(gameData!.players).forEach((name, index) => {
			gameUpdate[`players.${name}`] = gameData?.deck.slice(
				index * 24,
				(index + 1) * 24
			);
		});

		await db
			.collection("games")
			.doc(gameId)
			.update({
				...gameUpdate,
				started: true,
				currentMove: "TURN",
				turn: user.name
			});

		setLoading(false);
	};

	useEffect(() => {
		const unsubscribeFromGame = db
			.collection("games")
			.doc(gameId)
			.onSnapshot((snapshot) => {
				if (snapshot.exists) {
					setGameData(snapshot.data() as any);
				}
			});

		return () => unsubscribeFromGame();
	}, [gameId]);

	return (
		<GameContext.Provider value={gameData}>
			<div className="wrapper">
				<div className="top-container">
					<img src={Logo} alt="" className="logo-mark" />
					{gameData &&
						Object.keys(gameData.players).length === 2 &&
						Object.keys(gameData.teams).length > 0 && <Scoreboard />}
				</div>
				{!gameData && <Spinner />}
				{gameData && !gameData.started && (
					<div className="card">
						{Object.keys(gameData.players).map((name) => (
							<div className="flag-wrapper" key={name}>
								<Flag
									appearance="success"
									title={name + " JOINED"}
									isDismissAllowed={false}
									id={name}
									icon={<TickIcon label="" secondaryColor={colors.G400} />}
								/>
							</div>
						))}
						{Object.keys(gameData.players).length === 2 &&
							Object.keys(gameData.teams).length === 0 &&
							gameData.createdBy === user.name && (
								<Button
									appearance="primary"
									className="button"
									onClick={() => setVisible(true)}
								>
									Create Teams
								</Button>
							)}
						{Object.keys(gameData.players).length === 2 &&
							Object.keys(gameData.teams).length > 0 &&
							getTeamDescriptions(gameData.teams).map((description) => (
								<div className="flag-wrapper" key={description}>
									<Flag
										appearance="warning"
										title={description}
										isDismissAllowed={false}
										id={description}
										icon={
											<TickIcon
												label=""
												primaryColor={colors.N0}
												secondaryColor={colors.Y400}
											/>
										}
									/>
								</div>
							))}
						{Object.keys(gameData.players).length === 2 &&
							Object.keys(gameData.teams).length > 0 &&
							gameData.createdBy === user.name && (
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
							{getSortedHand(gameData.players[user.name]).map((card) => (
								<GameCardComponent card={card} key={card.rank + card.suit} />
							))}
						</div>
						<GamePlay />
					</Fragment>
				)}
				<h4 className="paragraph">Logged in as {user.email}</h4>
				<CreateTeams visible={visible} setVisible={setVisible} />
			</div>
		</GameContext.Provider>
	);
};