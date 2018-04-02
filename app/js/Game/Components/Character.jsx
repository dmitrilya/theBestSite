import React, {Component} from 'react';
import {Sprite} from 'react-konva';

export default class Character extends Component {
  constructor(props){
    super(props);
    this.state = {
      x: this.props.startX,
      y: this.props.startY,
      speedX: 0,
      speedY: 0,
      hero:  null,
      animation: "stayRight"
    };
    this.animations = {
  stayRight: [0, 302, 104, 150],
  stayLeft: [104, 302, 104, 150],
  walkingRight: [0, 0, 104, 150,
                104, 0, 104, 150,
                208, 0,  104, 150,
                312, 0, 104, 150,
                416, 0, 104, 150,
                520, 0, 104, 150],
  walkingLeft: [0, 150, 104, 150,
                104, 150, 104, 150,
                208, 150,  104, 150,
                312, 150, 104, 150,
                416, 150, 104, 150,
                520, 150, 104, 150],
  bomzStay: [31,54,76,206]
};
  this.idtimer;
  this.startSprite = false;
  }

  componentDidMount() {
    this.sprite.start();
		window.addEventListener("keydown", event => {
			this.changeWay(event);
		});
    window.addEventListener("keyup", event => {
			this.setState({speedX: 0, speedY: 0});
        if(this.state.animation == "walkingRight"){
          this.setState({animation: "stayRight"});
        }
        else if(this.state.animation == "walkingLeft"){
          this.setState({animation: "stayLeft"});
        }
        this.startSprite = false;
        clearInterval(this.idtimer);
		});
    var hero = new window.Image();
    hero.src = "./../../../src/img/mainHero.png";
    hero.onload = () => {
      this.setState({
        hero: hero
      });
	}
}

clear() {
  console.log('here');
  clearInterval(this.idtimer);
}

  update = () => {
    let x = this.state.x,
        y = this.state.y,
        speedX = this.state.speedX,
        speedY = this.state.speedY;
    this.props.canGo(x, y, speedX, speedY);
	}

  changeWay = event => {
    let anim = this.state.animation;
    if(!this.startSprite){
    if (event.key == "ArrowDown") {
        this.setState({ speedX: 0, speedY: 15});
      if(anim == "stayRight"){
        this.setState({animation: "walkingRight"});
      }
      else if(anim == "stayLeft"){
        this.setState({animation: "walkingLeft"});
      }
    } else if (event.key == "ArrowRight") {
      this.setState({ speedX: 15, speedY: 0 , animation: "walkingRight"});
    } else if (event.key == "ArrowUp") {
      this.setState({ speedX: 0, speedY: -15 });
      if(anim == "stayRight"){
        this.setState({animation: "walkingRight"});
      }
      else if(anim == "stayLeft"){
        this.setState({animation: "walkingLeft"});
      }
    } else if (event.key == "ArrowLeft") {
      this.setState({ speedX: -15, speedY: 0 , animation: "walkingLeft"});
    } else if (event.key == 'e') {
      this.props.interraction(this.state.x, this.state.y);
    }
      this.idtimer = setInterval(() => {this.update()}, 60);
      this.startSprite = true;
    }
  }

  render(){
    return(
      <Sprite ref={sprite => {this.sprite = sprite}} x={this.state.x} y={this.state.y} image={this.state.hero} animation = {this.state.animation}
            animations = {this.animations} frameRate = {0} frameIndex = {0} />
          )
        }
  }
