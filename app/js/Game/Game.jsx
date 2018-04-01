import React, { Component } from "react";
import { Circle, Text, Stage, Layer } from 'react-konva';
import Konva from 'konva';
import Character from './Components/Character';

export default class Game extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<Stage width={window.innerWidth-50} height={window.innerHeight-200}>
        <Layer>
          <Character/>

        </Layer>
      </Stage>
);
  }
}
