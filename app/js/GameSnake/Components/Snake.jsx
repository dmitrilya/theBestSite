import React, { Component } from "react";
import { Circle, Layer } from "react-konva";

export default class Snake extends Component {
	constructor(props) {
		super(props);
		this.state = {
			x: 15,
			y: 15,
			speedX: 5,
			speedY: 0
		};
		this.idTimer;
	}

	componentDidMount() {
		this.idTimer = setInterval(() => {
			this.update();
		}, 50);
		window.addEventListener("keydown", event => {
			this.changeWay(event);
		});
	}

	update = () => {
		this.setState({
			x: this.state.x + this.state.speedX,
			y: this.state.y + this.state.speedY
		});
		this.outOfSize();
	};

	changeWay = event => {
		if (event.key == "ArrowDown") {
			this.setState({ speedX: 0, speedY: 5 });
		} else if (event.key == "ArrowRight") {
			this.setState({ speedX: 5, speedY: 0 });
		} else if (event.key == "ArrowUp") {
			this.setState({ speedX: 0, speedY: -5 });
		} else if (event.key == "ArrowLeft") {
			this.setState({ speedX: -5, speedY: 0 });
		}
	};

	outOfSize = () => {
		let size = this.props.size * 30,
			x = this.state.x,
			y = this.state.y;

		if (x > size) {
			x = 0;
		} else if (x < 0) {
			x = size;
		}
		if (y > size) {
			y = 0;
		} else if (y < 0) {
			y = size;
		}

		this.setState({ x: x, y: y });
	};

	stopUpdate = () => {
		clearInterval(this.idTimer);
	};

	render() {
		return <Circle fill="blue" radius={10} x={this.state.x} y={this.state.y} />;
	}
}
