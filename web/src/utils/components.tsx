import React from "react";

import Club from "../assets/club.png";
import Diamond from "../assets/diamond.png";
import Heart from "../assets/heart.png";
import Spade from "../assets/spade.png";
import { getCardColor } from "./constants";
import { GameCard } from "./deck";

export const getSuitComponent = (suit: string) => {
	switch (suit) {
		case "Hearts":
			return () => <img className="suit-icon" src={Heart} alt="" />;
		case "Clubs":
			return () => <img className="suit-icon" src={Club} alt="" />;
		case "Spades":
			return () => <img className="suit-icon" src={Spade} alt="" />;
		case "Diamonds":
			return () => <img className="suit-icon" src={Diamond} alt="" />;
		default:
			return () => (
				<img className="suit-icon" src="../assets/icon.png" alt="" />
			);
	}
};

export const getRankComponent = (card: GameCard) => {
	const color = getCardColor(card.suit);

	switch (card.rank) {
		case "Ace":
			return () => (
				<div style={{ color }} className="rank-icon">
					A
				</div>
			);
		case "Two":
			return () => (
				<div style={{ color }} className="rank-icon">
					2
				</div>
			);
		case "Three":
			return () => (
				<div style={{ color }} className="rank-icon">
					3
				</div>
			);
		case "Four":
			return () => (
				<div style={{ color }} className="rank-icon">
					4
				</div>
			);
		case "Five":
			return () => (
				<div style={{ color }} className="rank-icon">
					5
				</div>
			);
		case "Six":
			return () => (
				<div style={{ color }} className="rank-icon">
					6
				</div>
			);
		case "Seven":
			return () => (
				<div style={{ color }} className="rank-icon">
					7
				</div>
			);
		case "Eight":
			return () => (
				<div style={{ color }} className="rank-icon">
					8
				</div>
			);
		case "Nine":
			return () => (
				<div style={{ color }} className="rank-icon">
					9
				</div>
			);
		case "Ten":
			return () => (
				<div style={{ color }} className="rank-icon">
					10
				</div>
			);
		case "Jack":
			return () => (
				<div style={{ color }} className="rank-icon">
					J
				</div>
			);
		case "Queen":
			return () => (
				<div style={{ color }} className="rank-icon">
					Q
				</div>
			);
		case "King":
			return () => (
				<div style={{ color }} className="rank-icon">
					K
				</div>
			);
		default:
			return () => <div>Joker</div>;
	}
};
