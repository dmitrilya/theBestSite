import React from "react";
import { Stage } from "react-konva";
import Game from "./Game";

export default function Kek() {
	return (
		<Stage width={window.innerWidth - 50} height={window.innerHeight - 200}>
			<Game />
		</Stage>
	);
}
