import React, { useContext } from "react";
import { MoveType } from "../generated";
import { GameContext } from "../utils/context";
import { Banner } from "./Banner";

const colorMap: Record<MoveType, "danger" | "warning" | "success"> = {
	ASK: "warning",
	CALL: "warning",
	CALL_FAIL: "danger",
	CALL_SUCCESS: "success",
	DECLINED: "danger",
	GIVEN: "success",
	TURN: "warning"
};

export const PreviousMoves = () => {
	const { currentMove, lastMove, secondLastMove } = useContext(GameContext)!;

	return (
		<div className="flex-container">
			{currentMove && (
				<Banner
					content={currentMove.description}
					color={colorMap[currentMove.type]}
					heading="CURRENT MOVE"
				/>
			)}
			{lastMove && (
				<Banner
					content={lastMove.description}
					color={colorMap[lastMove.type]}
					heading="LAST MOVE"
				/>
			)}
			{secondLastMove && (
				<Banner
					content={secondLastMove.description}
					color={colorMap[secondLastMove.type]}
					heading="SECOND LAST MOVE"
				/>
			)}
		</div>
	);
};
