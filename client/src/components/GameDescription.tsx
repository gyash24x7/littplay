import {
	IonAvatar,
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonCol,
	IonLoading,
	IonRow,
	IonText
} from "@ionic/react";
import React from "react";
import { GameStatus, GetGameQuery, useStartGameMutation } from "../generated";
import { ErrorMsg } from "./ErrorMsg";

interface StartGameProps {
	game: GetGameQuery["getGame"];
	displayToast: () => void;
}

export const GameDescription = ({ game, displayToast }: StartGameProps) => {
	const [startGame, { loading, error }] = useStartGameMutation({
		variables: { gameId: game._id }
	});

	const copyCode = () =>
		navigator.clipboard.writeText(game.code).then(displayToast);

	return (
		<IonRow>
			<IonCol>
				<IonCard className="game-play-card">
					{loading && <IonLoading isOpen />}
					<IonCardHeader>
						<IonRow className="game-description-row">
							<IonCol>
								<IonCardSubtitle className="card-subtitle">
									GAME CODE
								</IonCardSubtitle>
								<IonCardTitle className="game-code">{game.code}</IonCardTitle>
								<IonCardSubtitle className="montserrat">
									Share the code with other players
								</IonCardSubtitle>
							</IonCol>
							{game.status === GameStatus.NotStarted && (
								<IonCol sizeXl="3" sizeSm="4" size="12">
									<IonButton
										color="dark"
										className="app-button small"
										onClick={copyCode}
									>
										Copy Code
									</IonButton>
								</IonCol>
							)}
							{game.status === GameStatus.TeamsCreated && (
								<IonCol sizeXl="3" sizeSm="4" size="12">
									<IonButton
										className="app-button small"
										onClick={() => startGame()}
									>
										Start Game
									</IonButton>
								</IonCol>
							)}
						</IonRow>
						<IonRow>
							{game.status === GameStatus.InProgress &&
								game.teams.map((team) => (
									<IonCard key={team} className="game-play-card">
										<IonCardHeader>
											<IonCardTitle className="montserrat">{team}</IonCardTitle>
										</IonCardHeader>
										<IonCardContent className="team-score-card">
											<div className="avatar-group">
												{game.players
													.filter((player) => player.team === team)
													.map(({ avatar, _id }) => (
														<IonAvatar key={_id}>
															<img src={avatar} alt="" />
														</IonAvatar>
													))}
											</div>
											<br />
											<IonText className="game-score">0</IonText>
										</IonCardContent>
									</IonCard>
								))}
						</IonRow>
						{error && <ErrorMsg message={error.message} />}
					</IonCardHeader>
				</IonCard>
			</IonCol>
		</IonRow>
	);
};
