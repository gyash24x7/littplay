export enum GameStatus {
	NOT_STARTED,
	STARTED,
	COMPLETED
}

export enum GameActivityKind {
	PLAYER_JOINED,
	GAME_STARTED,
	ASK_PLAYER,
	CARD_GIVEN,
	CARD_DECLINED,
	CALLING_SET,
	SET_CALLED
}

export const SUITS = ["SPADES", "HEARTS", "CLUBS", "DIAMONDS"];
export const RANKS = [
	"ACE",
	"TWO",
	"THREE",
	"FOUR",
	"FIVE",
	"SIX",
	"SEVEN",
	"EIGHT",
	"NINE",
	"TEN",
	"JACK",
	"QUEEN",
	"KING"
];
