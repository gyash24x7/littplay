import {
	IonContent,
	IonGrid,
	IonLoading,
	IonPage,
	IonToast
} from "@ionic/react";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import { AskCard } from "../components/AskCard";
import { CreateTeams } from "../components/CreateTeams";
import { ErrorMsg } from "../components/ErrorMsg";
import { GameDescription } from "../components/GameDescription";
import { HandCard } from "../components/HandCard";
import { PlayersCard } from "../components/PlayersCard";
import { PreviousMoves } from "../components/PreviousMoves";
import { TeamsCard } from "../components/TeamsCard";
import {
	GameStatus,
	GetGameQuery,
	useGameSubscription,
	useGetGameQuery
} from "../generated";
import { UserContext } from "../utils/context";

export const GamePage = () => {
	const [toastContent, setToastContent] = useState<string>();
	const [game, setGame] = useState<GetGameQuery["getGame"]>();
	const { gameId } = useParams();
	const { _id } = useContext(UserContext)!;

	const { loading, error, data } = useGetGameQuery({ variables: { gameId } });

	useGameSubscription({
		variables: { gameId },
		onSubscriptionData({ subscriptionData: { data } }) {
			if (data?.game) {
				setGame(game);
			}
		}
	});

	useEffect(() => {
		if (data?.getGame) setGame(data.getGame);
	}, [data]);

	if (error) return <ErrorMsg message={error.message} />;

	if (loading || !game) return <IonLoading isOpen />;

	if (!game.players.map(({ _id }) => _id).includes(_id)) {
		return <Redirect to="/game" />;
	}

	const { status, players, teams, currentMove, lastMove } = game;

	return (
		<IonPage>
			<IonContent>
				<IonGrid className="game-play-container">
					<GameDescription
						game={game}
						displayToast={() => setToastContent("Code copied to clipboard!")}
					/>
					{(status === GameStatus.NotStarted ||
						status === GameStatus.PlayersReady) && (
						<PlayersCard players={players} />
					)}
					{status === GameStatus.PlayersReady && _id === game.createdBy._id && (
						<CreateTeams />
					)}
					{status === GameStatus.TeamsCreated && (
						<TeamsCard teams={teams} players={players} />
					)}
					{status === GameStatus.InProgress && (
						<Fragment>
							{game.currentMove?.turn === _id && <AskCard game={game} />}
							<PreviousMoves currentMove={currentMove} lastMove={lastMove} />
							<HandCard
								player={players.find((player) => _id === player._id)!}
							/>
						</Fragment>
					)}
				</IonGrid>
				<IonToast
					isOpen={!!toastContent}
					duration={2500}
					onDidDismiss={() => setToastContent(undefined)}
					message={toastContent}
				/>
			</IonContent>
		</IonPage>
	);
};
