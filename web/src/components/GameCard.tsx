import React from "react";

import { getRankComponent, getSuitComponent } from "../utils/components";
import { getCardColor } from "../utils/constants";
import { GameCard } from "../utils/deck";

interface GameCardComponentProps {
	card: GameCard;
}

export const GameCardComponent = ({ card }: GameCardComponentProps) => {
	const Suit = getSuitComponent(card.suit);
	const Rank = getRankComponent(card);
	const color = getCardColor(card.suit);
	return (
		<div style={{ borderColor: color }} className="playing-card">
			<Suit />
			<Rank />
		</div>
	);
};
