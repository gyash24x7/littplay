import { Clipboard } from "@ionic-native/clipboard";
import {
	IonAvatar,
	IonButton,
	IonCard,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonCol,
	IonLoading,
	IonRow,
	IonText,
	IonTitle,
	isPlatform
} from "@ionic/react";
import React, { useContext, useState } from "react";
import { GameStatus, useStartGameMutation } from "../generated";
import { GameContext, UserContext } from "../utils/context";
import { ErrorMsg } from "./ErrorMsg";

interface StartGameProps {
	displayToast: () => void;
}

export const GameDescription = ({ displayToast }: StartGameProps) => {
	const game = useContext(GameContext)!;
	const user = useContext(UserContext)!;

	const [errorMsg, setErrorMsg] = useState<string>();
	const [startGame, { loading }] = useStartGameMutation({
		variables: { gameId: game._id },
		onError: (err) => setErrorMsg(err.message)
	});

	const copyCode = () => {
		if (isPlatform("desktop")) {
			navigator.permissions.query({ name: "clipboard" }).then((result) => {
				if (result.state === "granted" || result.state === "prompt") {
					navigator.clipboard?.writeText(game.code).then(displayToast);
				}
			});
		} else {
			Clipboard.copy(game.code).then(displayToast);
		}
	};

	return (
		<IonRow>
			<IonCol>
				<IonCard className="game-play-card">
					{loading && <IonLoading isOpen />}
					<IonCardHeader>
						<IonRow className="game-description-row">
							<IonCol sizeSm="6" sizeMd="4">
								<IonCardSubtitle className="card-subtitle">
									GAME CODE
								</IonCardSubtitle>
								<IonCardTitle className="game-code">{game.code}</IonCardTitle>
								<IonCardSubtitle className="montserrat">
									Share the code with other players
								</IonCardSubtitle>
								<div className="user-container">
									<IonAvatar slot="start">
										<img src={user.avatar} alt="" />
									</IonAvatar>
									<div className="user-details">
										<IonCardTitle>{user.name}</IonCardTitle>
										<IonCardSubtitle>{user.email}</IonCardSubtitle>
									</div>
								</div>
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
							{game.status === GameStatus.TeamsCreated &&
								game.createdBy._id === user._id && (
									<IonCol sizeXl="3" sizeSm="4" size="12">
										<IonButton
											className="app-button small"
											onClick={() => startGame()}
										>
											Start Game
										</IonButton>
										{errorMsg && <ErrorMsg message={errorMsg} />}
									</IonCol>
								)}
							{game.status === GameStatus.InProgress && (
								<IonCol sizeMd="8" size="12">
									<IonRow>
										{game.teams.map((team) => (
											<IonCol className="team-score-card" key={team.name}>
												<IonTitle className="montserrat">{team.name}</IonTitle>
												<br />
												<div className="avatar-group">
													{game.players
														.filter((player) => player.team === team.name)
														.map(({ avatar, _id }) => (
															<IonAvatar key={_id}>
																<img src={avatar} alt="" />
															</IonAvatar>
														))}
												</div>
												<br />
												<IonText className="game-score">{team.score}</IonText>
											</IonCol>
										))}
									</IonRow>
								</IonCol>
							)}
						</IonRow>
					</IonCardHeader>
				</IonCard>
			</IonCol>
		</IonRow>
	);
};
