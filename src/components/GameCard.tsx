import { colors } from "@atlaskit/theme";
import React from "react";

import { GameCard } from "../typings";
import { RANKS, SUITS } from "../utils/constants";

export const GameCardComponent = ({ card }: { card: GameCard }) => {
	let color = "";
	switch (card.suit) {
		case "Hearts":
		case "Diamonds":
			color = colors.R400;
			break;
		default:
			color = colors.N900;
	}

	return (
		<div style={{ borderColor: color }} className="playing-card">
			<img src={SUITS[card.suit]} alt="" className="suit-icon" />
			<div style={{ color }} className="rank-icon">
				{RANKS[card.rank]}
			</div>
		</div>
	);
};
