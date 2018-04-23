import React, { Component } from "react";
import { Image, Group, Text } from "react-konva";

export default class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: {
        bg: null
        // TODO: list of shop content
      }
    }
  }

  componentDidMount() {
    let img = this.state.img;
		img.bg = new window.Image();
		img.bg.src = "../../../src/img/inventory.png";
		img.bg.onload = () => {
			this.setState({ img: img });
		};
    img.key = new window.Image();
		img.key.src = "../../../src/img/key2.png";
		img.key.onload = () => {
			this.setState({ img: img });
		};
  }

  render() {
    return(
      <Group />
    )
  }
}
