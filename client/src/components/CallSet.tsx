import { SelectChangeEventDetail } from "@ionic/core";
import {
	IonButton,
	IonItem,
	IonLabel,
	IonList,
	IonLoading,
	IonSelect,
	IonSelectOption
} from "@ionic/react";
import React, { useContext, useState } from "react";
import { useCallSetMutation } from "../generated";
import { GameContext, UserContext } from "../utils/context";
import { GameCard, getAskableCardMap } from "../utils/deck";
import { ErrorMsg } from "./ErrorMsg";

export const CallSet = () => {
	const { _id } = useContext(UserContext)!;
	const game = useContext(GameContext)!;

	const mePlayer = game.players.find((player) => player._id === _id)!;
	const hand = mePlayer.hand.map((cardString) => new GameCard(cardString));
	const askableCardMap = getAskableCardMap(hand);
	const teamMembers = game.players.filter(({ team }) => team === mePlayer.team);

	let initialTeamCardMap: Record<string, string[]> = {};
	teamMembers.forEach((player) => (initialTeamCardMap[player._id] = []));

	const [selectedSet, setSelectedSet] = useState("");
	const [teamCardMap, setTeamCardMap] = useState(initialTeamCardMap);
	const [errorMsg, setErrorMsg] = useState<string>();

	const handSetSelect = (e: CustomEvent<SelectChangeEventDetail>) => {
		setSelectedSet(e.detail.value);
		let tempTeamCardMap: Record<string, string[]> = {};
		teamMembers.forEach((member) => {
			console.log("here");
			if (member._id === _id) {
				console.log("here");
				tempTeamCardMap[_id] = mePlayer.hand
					.map((cardString) => new GameCard(cardString))
					.filter(({ set }) => set === e.detail.value)
					.map((card) => card.getCardString());
			} else tempTeamCardMap[member._id] = [];
		});
		setTeamCardMap(tempTeamCardMap);
	};

	const handlePlayerCardsSelect = (playerId: string) => (
		e: CustomEvent<SelectChangeEventDetail>
	) => {
		let tempTeamCardMap = { ...teamCardMap };
		tempTeamCardMap[playerId] = e.detail.value;
		setTeamCardMap(tempTeamCardMap);
	};

	const [callSet, { loading }] = useCallSetMutation({
		variables: {
			gameId: game._id,
			set: selectedSet,
			callData: JSON.stringify(teamCardMap)
		},
		onError(err) {
			console.log(err);
			setErrorMsg(err.message);
		}
	});

	return (
		<IonList>
			<IonLoading isOpen={loading} />
			<IonItem>
				<IonLabel>Select Set</IonLabel>
				<IonSelect
					value={selectedSet}
					onIonChange={handSetSelect}
					interfaceOptions={{ header: "Select Set" }}
					interface="action-sheet"
					color="primary"
				>
					{Object.keys(askableCardMap).map((set) => (
						<IonSelectOption value={set} key={set}>
							{set}
						</IonSelectOption>
					))}
				</IonSelect>
			</IonItem>
			{selectedSet &&
				teamMembers
					.filter((member) => member._id !== _id)
					.map((member) => (
						<IonItem key={member._id}>
							<IonLabel>Cards with {member.name}</IonLabel>
							<IonSelect
								multiple
								value={teamCardMap[member._id]}
								onIonChange={handlePlayerCardsSelect(member._id)}
								interface="action-sheet"
								interfaceOptions={{ header: `Cards with ${member.name}` }}
							>
								{askableCardMap[selectedSet].map((card) => (
									<IonSelectOption key={card} value={card}>
										{card}
									</IonSelectOption>
								))}
							</IonSelect>
						</IonItem>
					))}
			<IonButton
				disabled={Object.values(teamCardMap).flat().length !== 6}
				className="app-button"
				onClick={() => callSet()}
			>
				CALL SET
			</IonButton>
			{errorMsg && (
				<IonItem>
					<ErrorMsg message={errorMsg} />
				</IonItem>
			)}
		</IonList>
	);
};
