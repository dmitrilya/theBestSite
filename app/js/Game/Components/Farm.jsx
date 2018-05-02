import React, { Component } from "react";
import { Image, Group } from "react-konva";

export default class Farm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			img: {
        bg: null,
        shovel: null
      }
		};
	}

	componentDidMount() {
    let img = this.state.img;
		img.bg = new window.Image();
		img.bg.src = "../../../src/img/game/locations/farm.jpg";
		img.bg.onload = () => {
			this.setState({ img: img });
		};
    if (!this.props.findedItems.shovel) {
      img.shovel = new window.Image();
  		img.shovel.src = "../../../src/img/game/shovel.png";
  		img.shovel.onload = () => {
  			this.setState({ img: img });
  		};
    }
	}

  deleteItem(numberOfItem) { //удалить итем с комнаты по номеру
		let img = this.state.img;
		switch (numberOfItem) {
			case 2:
				img.shovel = null;
				break;
		}
		this.setState({img: img})
	}

	render() {
		return (
			<Group>
				<Image image={this.state.img.bg} width={window.innerWidth} height={window.innerHeight}/>
        <Image image={this.state.img.shovel} x={700} y={550}/>
			</Group>
		);
	}
}
