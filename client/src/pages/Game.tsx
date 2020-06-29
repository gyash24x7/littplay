import {
	IonCol,
	IonContent,
	IonGrid,
	IonLoading,
	IonPage,
	IonRow,
	IonToast
} from "@ionic/react";
import React, { Fragment, useContext, useState } from "react";
import { Redirect, useParams } from "react-router";
import { CreateTeams } from "../components/CreateTeams";
import { ErrorMsg } from "../components/ErrorMsg";
import { NewGameCard } from "../components/NewGameCard";
import { PlayersCard } from "../components/PlayersCard";
import { TeamCard } from "../components/TeamCard";
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

	const { loading, error } = useGetGameQuery({
		variables: { gameId },
		onCompleted: (data) => setGame(data.getGame)
	});

	useGameActivitySubscription({
		variables: { gameId },
		onSubscriptionData({ subscriptionData: { data } }) {
			setToastContent(data?.gameActivity.description);
			setGame(data?.gameActivity.game);
		}
	});

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
					{error && <ErrorMsg message={error.message} />}
					{game && (
						<NewGameCard
							gameCode={game.code!}
							displayToast={() => setToastContent("Code copied to clipboard!")}
						/>
					)}
					{game?.status === GameStatus.NotStarted && (
						<Fragment>
							<PlayersCard players={game.players || []} />
							{game.players?.length === game.playerCount && <CreateTeams />}
						</Fragment>
					)}
					{game?.status === GameStatus.TeamsCreated && (
						<IonRow>
							{game.teams?.map((team) => (
								<IonCol key={team} sizeMd="6" size="12">
									<TeamCard
										team={team!}
										players={
											game.players?.filter((player) => player?.team === team) ||
											[]
										}
									/>
								</IonCol>
							))}
						</IonRow>
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
