import React, {Component} from "react";
import {Image, Stage, Layer} from 'react-konva';
import Character from './Character';

export default class Gym extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    }
  }

  componentDidMount() {
    var image = new window.Image();
    image.src = "../../../src/img/gym.jpg";
    image.onload = () => {
      this.setState({image: image});
    }
  }

  canGo = (x, y, speedX, speedY) => {
    let width = 1155,
      height = window.innerHeight - 360;
    if (x > 0 && speedX < 0) {
      this.character.setState({
        x: x + speedX,
        y: y + speedY
      });
    } else if (x < width && speedX > 0) {
      this.character.setState({
        x: x + speedX,
        y: y + speedY
      });
    } else if (y > 280 && speedY < 0) {
      this.character.setState({
        x: x + speedX,
        y: y + speedY
      });
    } else if (y < height && speedY > 0) {
      this.character.setState({
        x: x + speedX,
        y: y + speedY
      });
    }
    console.log(x);
    if (x > width - 5)
      this.props.changeMode("0");
    }

  interraction = (x, y) => {
    // if (x > 28 && x < 117 && y < 310) {
    //   alert("hello");
    //}
  }

  render() {
    return (<Layer>
      <Image image={this.state.image}/>
      <Character startX={this.props.startX} startY={this.props.startY} ref={child => {
          this.character = child
        }} canGo={this.canGo} interraction={this.interraction}/>
    </Layer>);
  }
}
