import Banner from "@atlaskit/banner";
import Button from "@atlaskit/button";
import React, { Fragment, useState } from "react";

import { Game, Player } from "../typings";
import { GameCard } from "../utils/deck";
import { AskPlayer } from "./AskPlayer";
import { DeclineCard } from "./DeclineCard";
import { GiveCard } from "./GiveCard";

interface GamePlayProps {
	gameData: Game;
	activePlayer?: Player;
}

export const GamePlay = ({ gameData, activePlayer }: GamePlayProps) => {
	const [visible, setVisible] = useState(false);

	const user: Player = JSON.parse(localStorage.getItem("user")!);

	let moveDescription = "";
	switch (gameData.currentMove.type) {
		case "TURN":
			moveDescription = `${gameData.currentMove.turn}'s Turn`;
			break;

		case "ASK":
			moveDescription = `${gameData.currentMove.by} asked ${
				gameData.currentMove.from
			} for ${GameCard.toString(gameData.currentMove.card!)}`;
			break;
	}

	return (
		<div className="game-play-container">
			{gameData?.players.length > 0 && (
				<Fragment>
					<div className="flag-wrapper">
						<Banner appearance="announcement" isOpen>
							<div className="banner-content">{moveDescription}</div>
						</Banner>
					</div>
					{gameData.currentMove.turn === user.name && (
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
								players={gameData.players}
								activePlayer={activePlayer}
							/>
						</div>
					)}
					{gameData.currentMove.from === user.name && (
						<div className="move-action">
							<GiveCard
								haveCard={
									activePlayer!.cards!.findIndex(card => {
										const rank = gameData.currentMove.card?.rank;
										const suit = gameData.currentMove.card?.suit;
										return card.suit === suit && card.rank === rank;
									}) > -1
								}
								gameData={gameData}
							/>
							<DeclineCard
								haveCard={
									activePlayer!.cards!.findIndex(card => {
										const rank = gameData.currentMove.card?.rank;
										const suit = gameData.currentMove.card?.suit;
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
