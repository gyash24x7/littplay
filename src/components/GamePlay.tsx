import Banner from "@atlaskit/banner";
import Button from "@atlaskit/button";
import React, { Fragment, useContext, useState } from "react";

import { getTeamName } from "../utils/constants";
import { GameContext, UserContext } from "../utils/context";
import { cardToString, getHaveCards } from "../utils/deck";
import { AskPlayer } from "./AskPlayer";
import { CallSet } from "./CallSet";
import { DeclineCard } from "./DeclineCard";
import { GiveCard } from "./GiveCard";

export const GamePlay = () => {
	const [visibleAsk, setVisibleAsk] = useState(false);
	const [visibleCall, setVisibleCall] = useState(false);
	const [timer, setTimer] = useState(4);

	const { currentMove, turn, askData, callData, players, teams } = useContext(
		GameContext
	)!;

	const { user } = useContext(UserContext);

	let moveDescription = "";
	switch (currentMove) {
		case "TURN":
			moveDescription = `${turn}'s Turn`;
			break;

		case "ASK":
			moveDescription = `${askData!.askedBy} asked ${
				askData!.askedFrom
			} for ${cardToString(askData!.askedFor)}`;
			break;

		case "CALL":
			moveDescription = `${callData?.calledBy} called ${callData?.calledSet} ${callData?.status}LY`;
			setInterval(() => {
				setTimer(timer - 1);
			}, 900);
			break;
	}

	return (
		<div className="game-play-container">
			{Object.keys(players).length > 0 && (
				<Fragment>
					<h2 className="sub-heading">TEAM {getTeamName(user.name, teams)}</h2>
					<div className="flag-wrapper">
						<Banner appearance="announcement" isOpen>
							<div className="banner-content">{moveDescription}</div>
						</Banner>
						<br />
						{callData && (
							<div className="banner-content" style={{ textAlign: "center" }}>
								Proceeding in {timer} seconds
							</div>
						)}
					</div>
					{turn === user.name && (
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
							<AskPlayer visible={visibleAsk} setVisible={setVisibleAsk} />
							<CallSet visible={visibleCall} setVisible={setVisibleCall} />
						</div>
					)}
					{askData?.askedFrom === user.name && (
						<div className="move-action">
							<GiveCard
								haveCard={getHaveCards(players[user.name], askData?.askedFor)}
							/>
							<DeclineCard
								haveCard={getHaveCards(players[user.name], askData?.askedFor)}
							/>
						</div>
					)}
				</Fragment>
			)}
		</div>
	);
};
