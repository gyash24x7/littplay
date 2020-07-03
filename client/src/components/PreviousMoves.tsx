import React, { Fragment, useContext } from "react";
import { GameContext } from "../utils/context";
import { Banner } from "./Banner";

export const PreviousMoves = () => {
	const { currentMove, lastMove } = useContext(GameContext)!;

	return (
		<Fragment>
			<Banner content={currentMove?.description} color="danger" />
			<Banner content={lastMove?.description} color="success" isLast />
		</Fragment>
	);
};
