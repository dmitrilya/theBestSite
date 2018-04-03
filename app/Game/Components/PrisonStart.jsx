import React, {Component} from "react";
import {Image, Stage, Layer, Group} from 'react-konva';
import Character from './Character';
import Bum from "./Bum";

export default class PrisonStart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    }
  }

  componentDidMount() {
    var image = new window.Image();
    image.src = "../../../src/img/prisonStart.jpg";
    image.onload = () => {
      this.setState({image: image});
    }
  }

  // componentShouldUpdate(x) {
  //   return (x>0);
  // }

  canGo = (x, y, speedX, speedY, move) => {
    let width = 1155,
      height = window.innerHeight - 360;
    if (x <= -104 && speedX < 0) {
      this.character.setState({
        move: true
      });
    } else if (x >= width && speedX > 0) {
      this.character.setState({
        move: false
      });
    } else if (y <= 280 && speedY < 0) {
      this.character.setState({
        move: false
      });
    } else if (y >= height && speedY > 0) {
      this.character.setState({
        move: false
      });
    }
    else{
      this.character.setState({
        move: true
      });
    }
    if (x < 0){
      this.character.clear();
      this.props.changeMode("1");
    }
    // this.componentShouldUpdate(x);
     }

  interraction = (x, y) => {
    if (x > 28 && x < 117 && y < 310) {
      alert("hello");
    }
  }

  render() {
    return (<Layer>
      <Image image={this.state.image}/>
      <Bum ref={child => {
          this.bum = child
        }}/>
      <Character startX={this.props.startX} startY={this.props.startY} ref={child => {
          this.character = child
        }} canGo={this.canGo} interraction={this.interraction}/>
    </Layer>);
  }
}
