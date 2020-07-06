import { IonToast } from "@ionic/react";
import React, { Fragment, useContext, useState } from "react";
import { GameContext, UserContext } from "../utils/context";
import { Banner } from "./Banner";
import { CreateTeams } from "./CreateTeams";
import { GameDescription } from "./GameDescription";
import { GiveOrDecline } from "./GiveOrDecline";
import { HandCard } from "./HandCard";
import { PlayersCard } from "./PlayersCard";
import { PreviousMoves } from "./PreviousMoves";
import { TeamsCard } from "./TeamsCard";
import { TransferChance } from "./TransferChance";
import { TurnSegment } from "./TurnSegment";

export const GamePlayContainer = () => {
	const { teams, currentMove, players, createdBy, status } = useContext(
		GameContext
	)!;
	const [toastContent, setToastContent] = useState<string>();
	const { _id } = useContext(UserContext)!;

	const mePlayer = players.find((player) => player._id === _id)!;

	const getGameCompletionDescription = () => {
		if (teams[0].score > teams[1].score) {
			return `Team ${teams[0].name} won the game, Scoreline : ${teams[0].score}-${teams[1].score}`;
		}

		if (teams[1].score > teams[0].score) {
			return `Team ${teams[1].name} won the game, Scoreline : ${teams[1].score}-${teams[0].score}`;
		}

		return `The Game tied at 4 - 4`;
	};

	return (
		<div className="game-play-container">
			<GameDescription
				displayToast={() => setToastContent("Code copied to clipboard!")}
			/>
			{(status === "NOT_STARTED" || status === "PLAYERS_READY") && (
				<PlayersCard />
			)}
			{status === "PLAYERS_READY" && _id === createdBy._id && <CreateTeams />}
			{status === "TEAMS_CREATED" && <TeamsCard />}
			{status === "IN_PROGRESS" && (
				<Fragment>
					<PreviousMoves />
					{currentMove?.turn === _id && mePlayer.hand.length !== 0 && (
						<TurnSegment />
					)}
					{currentMove?.askedFrom === _id && <GiveOrDecline />}

					<HandCard player={players.find((plyr) => _id === plyr._id)!} />
					{currentMove?.turn === _id && mePlayer.hand.length === 0 && (
						<TransferChance />
					)}
				</Fragment>
			)}
			{status === "COMPLETED" && (
				<div className="flex-container">
					<Banner
						color="success"
						content={getGameCompletionDescription()}
						heading="GAME COMPLETED"
					/>
				</div>
			)}
			<IonToast
				isOpen={!!toastContent}
				duration={2500}
				onDidDismiss={() => setToastContent(undefined)}
				message={toastContent}
			/>
		</div>
	);
};
