import React, {Component} from "react";
import { Line, Layer } from "react-konva";

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.items = [];
  }

  componentWillMount() {
    let height=(this.props.size)*30;
    for (var i = 0; i < this.props.size+1; i++) {
      this.items.push([i*30, 0, i*30, height]);
      this.items.push([0, i*30, height, i*30]);
    }
  }

  render() {
    return (<Layer>{this.items.map(item => <Line strokeWidth= {1} points={item} stroke='gray' />)}</Layer>);
  }
}
