import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Circle, Stage, Layer } from 'react-konva';
import Konva from 'konva';

class Game extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Circle radius={20} fill="yellow" x={20} y={20}/>
        </Layer>
      </Stage>
);
  }
}

ReactDOM.render(<Game />, document.getElementById('root'));
