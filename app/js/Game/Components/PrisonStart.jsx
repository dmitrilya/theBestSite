import React, { Component } from "react";
import { Image, Group } from "react-konva";
import Bum from "./Bum";

export default class PrisonStart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			image: null
		};
	}

	componentDidMount() {
		var image = new window.Image();
		image.src = "../../../src/img/prisonStart.jpg";
		image.onload = () => {
			this.setState({ image: image });
		};
	}

	render() {
		return (
			<Group>
				<Image image={this.state.image} />
				<Bum />
			</Group>
		);
	}
}
