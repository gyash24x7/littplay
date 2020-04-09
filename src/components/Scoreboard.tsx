import React, { Fragment, useContext } from "react";

import { GameContext } from "../utils/context";

export const Scoreboard = () => {
	const gameData = useContext(GameContext);
	console.log(gameData);

	return (
		<Fragment>
			{gameData && (
				<div className="scoreboard">
					<div>{Object.keys(gameData.teams)[0]}</div>
					<div>
						{gameData.teams[Object.keys(gameData.teams)[0]].score}&nbsp;-&nbsp;
						{gameData.teams[Object.keys(gameData.teams)[1]].score}
					</div>
					<div>{Object.keys(gameData.teams)[1]}</div>
				</div>
			)}
		</Fragment>
	);
};
