import React, { Component } from "react";
import Game from './Game';
import { Stage } from 'react-konva';

export default class Kek extends Component {
  constructor(props) {
    super(props);

  }

  render() {
      return (<Stage width={window.innerWidth-50} height={window.innerHeight-200}>
        <Game/>
              </Stage>);
    }
  }
