import React, { Component } from "react";
import { Image, Group } from "react-konva";

export default class Gym extends Component {
	constructor(props) {
		super(props);
		this.state = {
			image: null
		};
		this.done = false;
		this.changeMode = props.changeMode;
	}

	componentDidMount() {
		var image = new window.Image();
		image.src = "../../../src/img/gym.jpg";
		image.onload = () => {
			this.setState({ image: image });
		};
	}

	render() {
		return (
			<Group>
				<Image image={this.state.image} />
			</Group>
		);
	}
}
