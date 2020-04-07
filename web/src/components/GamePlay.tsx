import Banner from "@atlaskit/banner";
import Button from "@atlaskit/button";
import React, { Fragment, useState } from "react";

import { Game, User } from "../typings";
import { getTeamName } from "../utils/constants";
import { cardToString } from "../utils/deck";
import { AskPlayer } from "./AskPlayer";
import { CallSet } from "./CallSet";
import { DeclineCard } from "./DeclineCard";
import { GiveCard } from "./GiveCard";

interface GamePlayProps {
	gameData: Game;
}

export const GamePlay = ({ gameData }: GamePlayProps) => {
	const [visibleAsk, setVisibleAsk] = useState(false);
	const [visibleCall, setVisibleCall] = useState(false);

	const user: User = JSON.parse(localStorage.getItem("user")!);

	let moveDescription = "";
	switch (gameData.currentMove) {
		case "TURN":
			moveDescription = `${gameData.turn}'s Turn`;
			break;

		case "ASK":
			moveDescription = `${gameData.askData!.askedBy} asked ${
				gameData.askData!.askedFrom
			} for ${cardToString(gameData.askData!.askedFor)}`;
			break;

		case "CALL":
			moveDescription = `${gameData.callData?.calledBy} called ${gameData.callData?.calledSet} ${gameData.callData?.status}LY`;
			break;
	}

	return (
		<div className="game-play-container">
			{Object.keys(gameData.players).length > 0 && (
				<Fragment>
					<h2 className="sub-heading">
						{getTeamName(user.name, gameData.teams)}
					</h2>
					<div className="flag-wrapper">
						<Banner appearance="announcement" isOpen>
							<div className="banner-content">{moveDescription}</div>
						</Banner>
					</div>
					{gameData.turn === user.name && (
						<div className="move-action">
							<Button
								onClick={() => setVisibleAsk(true)}
								appearance="primary"
								className="button"
							>
								Ask Player
							</Button>
							<Button
								onClick={() => setVisibleCall(true)}
								appearance="warning"
								className="button"
							>
								Call Set
							</Button>
							<AskPlayer
								visible={visibleAsk}
								setVisible={setVisibleAsk}
								team={
									gameData.teams[getTeamName(user.name, gameData.teams, true)]
										.members
								}
								players={gameData.players}
							/>
							<CallSet
								visible={visibleCall}
								setVisible={setVisibleCall}
								team={
									gameData.teams[getTeamName(user.name, gameData.teams)].members
								}
								players={gameData.players}
								turnTransfer={
									gameData.teams[getTeamName(user.name, gameData.teams, true)]
										.members[0]
								}
							/>
						</div>
					)}
					{gameData.askData?.askedFrom === user.name && (
						<div className="move-action">
							<GiveCard
								haveCard={
									gameData.players[user.name].findIndex((card) => {
										const rank = gameData.askData?.askedFor.rank;
										const suit = gameData.askData?.askedFor.suit;
										return card.suit === suit && card.rank === rank;
									}) > -1
								}
								gameData={gameData}
							/>
							<DeclineCard
								haveCard={
									gameData.players[user.name].findIndex((card) => {
										const rank = gameData.askData?.askedFor.rank;
										const suit = gameData.askData?.askedFor.suit;
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
