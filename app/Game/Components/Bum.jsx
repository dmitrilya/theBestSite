import React, {Component} from 'react';
import {Sprite} from 'react-konva';

export default class Bum extends Component{
  constructor(props){
    super(props);
    this.state = {
      bum: null
    };
    this.animations = {
  bumStay: [340, 3, 85, 124,
            0,124,85,124,
            85, 124, 85,124,
            170, 124, 85, 124,
            255, 124, 85, 124,
            340, 124, 85, 124,
            0, 245, 85, 124,
            170, 245, 85, 124,
            255, 245, 85, 124]
};
  }
  componentDidMount(){
    var bum = new window.Image();
    bum.src = "./../../../src/img/personLenin.png";
    bum.onload = () => {
      this.setState({
        bum: bum
      });
  }
  this.sprite.start();
}
  render(){
    return(
      <Sprite ref={sprite => {this.sprite = sprite}} x={68} y={300} image={this.state.bum} animation = "bumStay"
            animations = {this.animations} frameRate = {3} frameIndex = {0} />
          )
        }
}
