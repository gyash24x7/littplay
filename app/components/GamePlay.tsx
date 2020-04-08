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
		<View className="game-play-container">
			{Object.keys(gameData.players).length > 0 && (
				<Fragment>
					<Text className="sub-heading">
						{getTeamName(user.name, gameData.teams)}
					</Text>
					<View className="flag-wrapper">
						<Banner appearance="announcement" isOpen>
							<View className="banner-content">{moveDescription}</View>
						</Banner>
					</View>
					{gameData.turn === user.name && (
						<View className="move-action">
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
						</View>
					)}
					{gameData.askData?.askedFrom === user.name && (
						<View className="move-action">
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
						</View>
					)}
				</Fragment>
			)}
		</View>
	);
};
