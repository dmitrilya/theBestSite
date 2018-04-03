import React, {Component} from 'react';
import {Sprite} from 'react-konva';

export default class Bum2 extends Component{
  constructor(props){
    super(props);
    this.state = {
      x: 170,
      y: 250,
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
            85, 245, 85,124,
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
      this.sprite.getframe(2);
      //this.sprite.start();
    }

  render(){
    return(
      <Sprite ref={sprite => {this.sprite = sprite}} x={this.state.x} y={this.state.y} image={this.state.bum} animation = "bumStay"
            animations = {this.animations} />
          )
        }
}
