import React, { Component } from "react";
import { Stage, Layer } from "react-konva";
import Grid from "./Components/Grid";
import Food from "./Components/Food";
import Snake from "./Components/Snake";

export default class GameSnake extends Component {
	constructor(props) {
		super(props);
		this.state = {
			size: 10
		};
	}

	render() {
		return (
			<Stage width={window.innerWidth - 100} height={window.innerHeight - 170}>
				<Grid size={this.state.size} />
				<Layer>
					<Food size={this.state.size} />
					<Snake size={this.state.size} />
				</Layer>
			</Stage>
		);
	}
}
