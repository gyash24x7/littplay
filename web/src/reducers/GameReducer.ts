import { initialState } from ".";
import {
  ASK_CARD,
  CALL_SET,
  COMPLETE_GAME,
  CREATE_GAME,
  DECLINE_CARD,
  GIVE_CARD,
  JOIN_GAME,
  START_GAME,
} from "../actions/types";
import { Game, GameAction, Move } from "../typings";
import { Deck, GameCard } from "../utils/deck";

export const GameReducer = (
	game = initialState.game,
	{ type, payload }: GameAction
): Game => {
	switch (type) {
		case CREATE_GAME:
			const deck = new Deck();
			deck.removeCardsOfRank("Seven");

			return {
				id: [...Array(6)]
					.map(_ => (~~(Math.random() * 36)).toString(36))
					.join("")
					.toUpperCase(),
				started: false,
				completed: false,
				currentMove: {} as Move,
				players: [],
				createdBy: payload.user.email,
				deck: deck.cards.map(GameCard.toMap),
				teams: {}
			};

		case JOIN_GAME:
			return {
				...game,
				players: game.players.concat(payload.user)
			};

		case START_GAME:
			return {
				...game,
				started: true,
				currentMove: { type: "TURN", turn: payload.user.name },
				teams: {
					A: game.players?.slice(0, 3).map(player => player.email),
					B: game.players?.slice(3).map(player => player.email)
				},
				players: game.players.map((player, index) => ({
					...player,
					cards: game.deck.slice(index * 8, index * 8 + 8)
				}))
			};

		case ASK_CARD:
			return {
				...game,
				currentMove: {
					type: "ASK",
					from: payload.from,
					by: payload.user.name,
					card: {
						rank: payload.card!.rank,
						suit: payload.card!.suit
					}
				}
			};

		case GIVE_CARD:
			let players = game.players;

			const takingPlayer = game.players.find(
				player => player.name === game.currentMove.by
			);

			players.forEach((player, index) => {
				if (player.email === payload.user.email) {
					players[index].cards = player.cards!.filter(
						({ rank, suit }) =>
							rank !== game.currentMove.card?.rank ||
							suit !== game.currentMove.card.suit
					);
				}

				if (player.email === takingPlayer?.email) {
					players[index].cards?.push(game.currentMove.card!);
				}
			});

			return {
				...game,
				players,
				currentMove: { type: "TURN", turn: takingPlayer?.name }
			};

		case DECLINE_CARD:
			return {
				...game,
				currentMove: { type: "TURN", turn: payload.user.name }
			};

		case CALL_SET:
			return game;

		case COMPLETE_GAME:
			return game;

		default:
			return game;
	}
};
