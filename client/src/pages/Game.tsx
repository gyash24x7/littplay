import {
	IonContent,
	IonGrid,
	IonLoading,
	IonPage,
	IonToast
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import { CreateTeams } from "../components/CreateTeams";
import { ErrorMsg } from "../components/ErrorMsg";
import { GameDescription } from "../components/GameDescription";
import { PlayersCard } from "../components/PlayersCard";
import { TeamsCard } from "../components/TeamsCard";
import {
	Game,
	GameStatus,
	useGameActivitySubscription,
	useGetGameQuery
} from "../generated";
import { DeepPartial } from "../generated/types";
import { UserContext } from "../utils/context";

export const GamePage = () => {
	const [toastContent, setToastContent] = useState<string>();
	const [game, setGame] = useState<DeepPartial<Game>>();
	const { gameId } = useParams();
	const user = useContext(UserContext)!;

	const { loading, error, data } = useGetGameQuery({ variables: { gameId } });

	useGameActivitySubscription({
		variables: { gameId },
		onSubscriptionData({ subscriptionData: { data } }) {
			setToastContent(data?.gameActivity.description);
			setGame(data?.gameActivity.game);
		}
	});

	useEffect(() => {
		if (data?.getGame) setGame(data.getGame);
	}, [data]);

	if (loading) return <IonLoading isOpen />;

	if (
		game?.players &&
		!game.players.map((player) => player?.user?.id).includes(user.id)
	) {
		return <Redirect to="/game" />;
	}

	return (
		<IonPage>
			<IonContent>
				<IonGrid className="game-play-container">
					{game && (
						<GameDescription
							game={game}
							displayToast={() => setToastContent("Code copied to clipboard!")}
						/>
					)}
					{error && <ErrorMsg message={error.message} />}
					{(game?.status === GameStatus.NotStarted ||
						game?.status === GameStatus.PlayersReady) && (
						<PlayersCard players={game.players || []} />
					)}
					{game?.status === GameStatus.PlayersReady && <CreateTeams />}
					{game?.status === GameStatus.TeamsCreated && (
						<TeamsCard
							teams={game?.teams || []}
							players={game?.players || []}
						/>
					)}
				</IonGrid>
				<IonToast
					isOpen={!!toastContent}
					duration={1000}
					onDidDismiss={() => setToastContent(undefined)}
					message={toastContent}
				/>
			</IonContent>
		</IonPage>
	);
};
