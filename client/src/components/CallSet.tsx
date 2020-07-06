import {
	IonButton,
	IonCardTitle,
	IonCol,
	IonIcon,
	IonItem,
	IonLoading
} from "@ionic/react";
import { chevronBack, chevronForward } from "ionicons/icons";
import React, { Fragment, useContext, useState } from "react";
import { useCallSetMutation } from "../generated";
import { GameContext, UserContext } from "../utils/context";
import {
	GameCard,
	getAskableCardMap,
	getCardColor,
	getRank,
	getSuitIcon
} from "../utils/deck";
import { ErrorMsg } from "./ErrorMsg";

interface CallSetProps {
	closeModal: () => void;
}

export const CallSet = ({ closeModal }: CallSetProps) => {
	const { _id } = useContext(UserContext)!;
	const game = useContext(GameContext)!;

	const mePlayer = game.players.find((player) => player._id === _id)!;
	const hand = mePlayer.hand.map((cardString) => new GameCard(cardString));
	const askableCardMap = getAskableCardMap(hand);
	let teamMembers = game.players.filter(({ team }) => team === mePlayer.team);

	let initialTeamCardMap: Record<string, string[]> = {};
	teamMembers.forEach((player) => (initialTeamCardMap[player._id] = []));

	const [selectedSet, setSelectedSet] = useState("");
	const [teamCardMap, setTeamCardMap] = useState(initialTeamCardMap);
	const [errorMsg, setErrorMsg] = useState<string>();
	const [panel, setPanel] = useState(0);

	const [callSet, { loading }] = useCallSetMutation({
		variables: {
			gameId: game._id,
			set: selectedSet,
			callData: JSON.stringify(teamCardMap)
		},
		onError(err) {
			console.log(err);
			setErrorMsg(err.message);
		},
		onCompleted() {
			setSelectedSet("");
			setTeamCardMap(initialTeamCardMap);
		}
	});

	const handleSelect = (
		field: "set" | "player",
		id: string,
		playerId?: string
	) => () => {
		let tempTeamCardMap: Record<string, string[]> = {};
		switch (field) {
			case "set":
				document
					.querySelectorAll(".select-overlay")
					.forEach((elem) => elem.classList.remove("select-overlay"));

				document.getElementById(id)?.classList.add("select-overlay");
				setSelectedSet(id);
				tempTeamCardMap = { ...initialTeamCardMap };
				tempTeamCardMap[mePlayer._id] = mePlayer.hand
					.map((cardString) => new GameCard(cardString))
					.filter(({ set }) => set === id)
					.map((card) => card.getCardString());
				break;

			case "player":
				document.getElementById(id)?.classList.add("select-overlay");
				tempTeamCardMap = { ...teamCardMap };
				document
					.querySelectorAll(".game-card.select-overlay")
					.forEach((elem) => {
						let set = new Set(tempTeamCardMap[playerId!]);
						set.add(elem.id);
						tempTeamCardMap[playerId!] = Array.from(set);
					});
				break;
		}

		setTeamCardMap(tempTeamCardMap);
	};

	teamMembers = teamMembers.filter(
		(member) => member._id !== _id && member.hand.length !== 0
	);

	return (
		<Fragment>
			<IonLoading isOpen={loading} />
			{panel === 0 && (
				<Fragment>
					<IonCardTitle>SELECT SET</IonCardTitle>
					<br />
					<div className="flex-container">
						{Object.keys(askableCardMap).map((set) => (
							<div key={set} id={set} onClick={handleSelect("set", set)}>
								{set}
							</div>
						))}
					</div>
				</Fragment>
			)}
			{selectedSet &&
				teamMembers.map((member, i) => {
					let cardsSelected: string[] = [];
					for (let j = 0; j < i; j++) {
						cardsSelected.push(...teamCardMap[teamMembers[j]._id]);
					}

					if (panel === i + 1) {
						return (
							<Fragment key={member._id}>
								<IonCardTitle>Cards with {member.name}</IonCardTitle>
								<br />
								<div className="flex-container">
									{askableCardMap[selectedSet]
										.filter((card) => !cardsSelected.includes(card))
										.map((cardString) => new GameCard(cardString))
										.map((gameCard) => (
											<div
												className="game-card"
												key={gameCard.getCardString()}
												id={gameCard.getCardString()}
												onClick={handleSelect(
													"player",
													gameCard.getCardString(),
													member._id
												)}
											>
												<img
													src={getSuitIcon(gameCard)}
													alt=""
													className="card-suit"
												/>
												<div
													className="card-rank"
													style={{ color: getCardColor(gameCard) }}
												>
													{getRank(gameCard)}
												</div>
											</div>
										))}
								</div>
							</Fragment>
						);
					} else return null;
				})}
			{panel === teamMembers.length + 1 && (
				<IonButton
					className="app-button"
					onClick={() => callSet().then(closeModal)}
					disabled={Object.values(teamCardMap).flat().length !== 6}
				>
					CALL SET
				</IonButton>
			)}
			<br />
			<div className="flex-container">
				<IonCol>
					{panel !== 0 && (
						<IonButton
							className="montserrat"
							expand="block"
							color="dark"
							onClick={() => setPanel(panel - 1)}
						>
							<IonIcon icon={chevronBack} />
							<span>PREV</span>
						</IonButton>
					)}
				</IonCol>
				<IonCol>
					{panel !== teamMembers.length + 1 && (
						<IonButton
							className="montserrat"
							color="dark"
							expand="block"
							onClick={() => setPanel(panel + 1)}
							disabled={panel === 0 && !selectedSet}
						>
							<span>NEXT</span>
							<IonIcon icon={chevronForward} />
						</IonButton>
					)}
				</IonCol>
			</div>
			{errorMsg && (
				<IonItem>
					<ErrorMsg message={errorMsg} />
				</IonItem>
			)}
		</Fragment>
	);
};
