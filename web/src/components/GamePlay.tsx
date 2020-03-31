import Banner from "@atlaskit/banner";
import Button from "@atlaskit/button";
import React, { Fragment, useState } from "react";

import { Game, Player, User } from "../typings";
import { GameCard } from "../utils/deck";
import { AskPlayer } from "./AskPlayer";
import { DeclineCard } from "./DeclineCard";
import { GiveCard } from "./GiveCard";

interface GamePlayProps {
	players: Player[];
	gameData: Game;
	activePlayer?: Player;
}

export const GamePlay = ({
	gameData,
	players,
	activePlayer
}: GamePlayProps) => {
	const [visible, setVisible] = useState(false);

	const user: User = JSON.parse(localStorage.getItem("user")!);

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

	return (
		<div className="game-play-container">
			{gameData && players.length > 0 && (
				<Fragment>
					<div className="flag-wrapper">
						<Banner appearance="announcement" isOpen>
							<div className="banner-content">{moveDescription}</div>
						</Banner>
					</div>
					{gameData.lastMove.turn === user.displayName && (
						<div className="move-action">
							<Button
								onClick={() => setVisible(true)}
								appearance="primary"
								className="button"
							>
								Ask Player
							</Button>
							<AskPlayer
								visible={visible}
								setVisible={setVisible}
								players={players}
								activePlayer={activePlayer}
							/>
						</div>
					)}
					{gameData.lastMove.from === user.displayName && (
						<div className="move-action">
							<GiveCard
								players={players}
								haveCard={
									activePlayer!.cards!.findIndex(card => {
										const rank = gameData.lastMove.card?.rank;
										const suit = gameData.lastMove.card?.suit;
										return card.suit === suit && card.rank === rank;
									}) > -1
								}
								gameData={gameData}
							/>
							<DeclineCard
								haveCard={
									activePlayer!.cards!.findIndex(card => {
										const rank = gameData.lastMove.card?.rank;
										const suit = gameData.lastMove.card?.suit;
										return card.suit === suit && card.rank === rank;
									}) > -1
								}
							/>
						</div>
					)}
				</Fragment>
			)}
		</div>
	);
};
