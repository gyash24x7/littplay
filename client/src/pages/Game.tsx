import { Vibration } from "@ionic-native/vibration";
import { isPlatform, RefresherEventDetail } from "@ionic/core";
import {
	IonContent,
	IonLoading,
	IonPage,
	IonRefresher,
	IonRefresherContent
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import { ErrorMsg } from "../components/ErrorMsg";
import { GamePlayContainer } from "../components/GamePlayContainer";
import {
	GetGameQuery,
	useGameSubscription,
	useGetGameQuery
} from "../generated";
import { GameContext, UserContext } from "../utils/context";

export const GamePage = () => {
	const [game, setGame] = useState<GetGameQuery["getGame"]>();
	const { gameId } = useParams();
	const { _id } = useContext(UserContext)!;

	const handleIonRefresh = (e: CustomEvent<RefresherEventDetail>) => {
		fetchMore({ variables: { gameId } }).then(({ data }: any) => {
			if (data?.getGame) setGame(data.getGame);
			e.detail.complete();
		});
	};

	const { loading, error, fetchMore } = useGetGameQuery({
		variables: { gameId },
		onCompleted: ({ getGame }) => setGame(getGame)
	});

	const { data } = useGameSubscription({
		variables: { gameId }
	});

	useEffect(() => {
		if (data?.game) {
			if (
				data.game.currentMove?.turn === _id ||
				data.game.currentMove?.askedFrom === _id
			) {
				if (isPlatform("android") || isPlatform("ios")) {
					Vibration.vibrate(1000);
				}
			}
			setGame(data.game);
		}
	}, [data, _id]);

	return (
		<IonPage>
			<IonContent>
				<IonRefresher slot="fixed" onIonRefresh={handleIonRefresh}>
					<IonRefresherContent />
				</IonRefresher>
				<IonLoading isOpen={loading || !game} />
				{error && <ErrorMsg message={error.message} />}
				{game && (
					<GameContext.Provider value={game}>
						{!game.players.map(({ _id }) => _id).includes(_id) && (
							<Redirect to="/game" />
						)}
						<GamePlayContainer />
					</GameContext.Provider>
				)}
			</IonContent>
		</IonPage>
	);
};
