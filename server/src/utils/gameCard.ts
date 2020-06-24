import { RANKS } from ".";

export class GameCard {
	suit: string;
	rank: string;
	set: string;

	constructor(cardString: string) {
		const [rank, suit] = cardString.split(" OF ");
		this.rank = rank;
		this.suit = suit;

		if (RANKS.indexOf(this.rank) > 5) this.set = "BIG";
		else this.set = "SMALL";
	}

	getCardString() {
		return this.rank + "_OF_" + this.suit;
	}
}
