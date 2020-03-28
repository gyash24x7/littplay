import { Text } from "@ui-kitten/components";
import React from "react";
import { Image } from "react-native";

import styles from "../styles";

export const getSuitComponent = (suit: string) => {
	switch (suit) {
		case "Hearts":
			return () => (
				<Image
					source={require("../assets/heart.png")}
					style={styles.suitIcon}
				/>
			);
		case "Clubs":
			return () => (
				<Image source={require("../assets/club.png")} style={styles.suitIcon} />
			);
		case "Spades":
			return () => (
				<Image
					source={require("../assets/spade.png")}
					style={styles.suitIcon}
				/>
			);
		case "Diamonds":
			return () => (
				<Image
					source={require("../assets/diamond.png")}
					style={styles.suitIcon}
				/>
			);
		default:
			return () => (
				<Image
					source={require("../assets/heart.png")}
					style={styles.suitIcon}
				/>
			);
	}
};

export const getRankComponent = (rank: string) => {
	switch (rank) {
		case "Ace":
			return () => <Text style={styles.rankIcon}>A</Text>;
		case "Two":
			return () => <Text style={styles.rankIcon}>2</Text>;
		case "Three":
			return () => <Text style={styles.rankIcon}>3</Text>;
		case "Four":
			return () => <Text style={styles.rankIcon}>4</Text>;
		case "Five":
			return () => <Text style={styles.rankIcon}>5</Text>;
		case "Six":
			return () => <Text style={styles.rankIcon}>6</Text>;
		case "Seven":
			return () => <Text style={styles.rankIcon}>7</Text>;
		case "Eight":
			return () => <Text style={styles.rankIcon}>8</Text>;
		case "Nine":
			return () => <Text style={styles.rankIcon}>9</Text>;
		case "Ten":
			return () => <Text style={styles.rankIcon}>10</Text>;
		case "Jack":
			return () => <Text style={styles.rankIcon}>J</Text>;
		case "Queen":
			return () => <Text style={styles.rankIcon}>Q</Text>;
		case "King":
			return () => <Text style={styles.rankIcon}>K</Text>;
		default:
			return () => <Text>Joker</Text>;
	}
};
