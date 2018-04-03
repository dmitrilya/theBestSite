import React, { Component } from "react";
import PrisonStart from './Components/PrisonStart';
import Gym from './Components/Gym';
import { Stage } from 'react-konva';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 0
    }
  }

  changeMode = (room) => {
    this.setState({mode: +room});
  }

  render() {
    let mode = this.state.mode;
    if (mode==0) {
      return (
        <PrisonStart startX={1} startY={350} changeMode={this.changeMode}/>)
    }
    if (mode==1) {
      return (
        <Gym startX={1150} startY={350} changeMode={this.changeMode}/>)
    }
  }
}
