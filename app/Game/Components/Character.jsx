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
      animation: "stayRight",
      move: true
    };
    this.animations = {
  stayRight: [0, 302, 104, 150],
  stayLeft: [104, 302, 104, 150],
walkingRight0: [0, 0, 104, 150],
walkingRight1: [104, 0, 104, 150],
walkingRight2: [208, 0,  104, 150],
walkingRight3: [312, 0, 104, 150],
walkingRight4: [416, 0, 104, 150],
walkingRight5: [520, 0, 104, 150],
  walkingLeft0: [0, 150, 104, 150],
  walkingLeft1: [104, 150, 104, 150],
  walkingLeft2: [208, 150,  104, 150],
  walkingLeft3: [312, 150, 104, 150],
  walkingLeft4: [416, 150, 104, 150],
  walkingLeft5: [520, 150, 104, 150]
};
  this.startSprite = false;
  this.index = 0;
  this.count = 0;
  this.direction = 1;
}

  componentDidMount() {
    this.sprite.start();
		window.addEventListener("keydown", event => {
			this.changeWay(event);
		});
    window.addEventListener("keyup", event => {
      if(this.state.speedX >= 0){
        this.setState({animation: "stayRight",speedX: 0, speedY: 0});
      }
      else if(this.state.speedX <= 0){
        this.setState({animation: "stayLeft",speedX: 0, speedY: 0});
      }
        this.startSprite = false;
        this.index = 0;
        this.count = 0;
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

  moveRight = () => {
    let x = this.state.x,
        y = this.state.y,
        speedX = this.state.speedX,
        speedY = this.state.speedY;
    this.props.canGo(x, y, speedX, speedY, this.state.move);
    if(this.state.move){
        if(this.index == 6){
          this.sprite.stop();
          this.setState({x: x + speedX, y: y + speedY});
          this.index = 0;
          this.setState({animation: "walkingRight5"});
          this.sprite.start();
        }
        if(this.count >= 10){
          this.sprite.stop();
          this.setState({x: x + speedX, y: y + speedY});
          this.setState({animation: "walkingRight" + this.index});
          this.sprite.start();
          this.index++;
          this.count = 0;
        }
        else{
          this.count++;
        }
      }
	}

  moveLeft = () => {
    let x = this.state.x,
        y = this.state.y,
        speedX = this.state.speedX,
        speedY = this.state.speedY;
    this.props.canGo(x, y, speedX, speedY, this.state.move);
    if(this.state.move){
        if(this.index == 6){
          this.sprite.stop();
          this.setState({x: x + speedX, y: y + speedY});
          this.index = 0;
          this.setState({animation: "walkingLeft5"});
          this.sprite.start();
        }
        if(this.count >= 10){
          this.sprite.stop();
          this.setState({x: x + speedX, y: y + speedY});
          this.setState({animation: "walkingLeft" + this.index});
          this.sprite.start();
          this.index++;
          this.count = 0;
        }
        else{
          this.count++;
        }
    }
	}
  moveDown = () => {
    let x = this.state.x,
        y = this.state.y,
        speedX = this.state.speedX,
        speedY = this.state.speedY;
    this.props.canGo(x, y, speedX, speedY, this.state.move);
    if(this.state.move){
        if(this.index == 6){
          this.sprite.stop();
          this.setState({x: x + speedX, y: y + speedY});
          this.index = 0;
          this.setState({animation: "walkingRight5"});
          this.sprite.start();
        }
        if(this.count >= 10){
          this.sprite.stop();
          this.setState({x: x + speedX, y: y + speedY});
          this.setState({animation: "walkingRight" + this.index});
          this.sprite.start();
          this.index++;
          this.count = 0;
        }
        else{
          this.count++;
        }
      }
	}

  moveUp = () => {
    let x = this.state.x,
        y = this.state.y,
        speedX = this.state.speedX,
        speedY = this.state.speedY;
    this.props.canGo(x, y, speedX, speedY, this.state.move);
    if(this.state.move){
        if(this.index == 6){
          this.sprite.stop();
          this.setState({x: x + speedX, y: y + speedY});
          this.index = 0;
          this.setState({animation: "walkingRight5"});
          this.sprite.start();
        }
        if(this.count >= 10){
          this.sprite.stop();
          this.setState({x: x + speedX, y: y + speedY});
          this.setState({animation: "walkingRight" + this.index});
          this.sprite.start();
          this.index++;
          this.count = 0;
        }
        else{
          this.count++;
        }
      }
  }
  changeWay = event => {
    let anim = this.state.animation;
    if(!this.startSprite){
    if (event.key == "ArrowDown") {
        this.setState({ speedX: 0, speedY: 15});
        this.direction = 0;
      if(anim == "stayRight"){
        this.setState({animation: "walkingRight0"});
      }
      else if(anim == "stayLeft"){
        this.setState({animation: "walkingLeft0"});
      }
    } else if (event.key == "ArrowRight") {
      this.setState({ speedX: 15, speedY: 0 , animation: "walkingRight0"});
      this.direction = 1;
    } else if (event.key == "ArrowUp") {
      this.direction = 2;
      this.setState({ speedX: 0, speedY: -15 });
      if(anim == "stayRight"){
        this.setState({animation: "walkingRight0"});
      }
      else if(anim == "stayLeft"){
        this.setState({animation: "walkingLeft0"});
      }
    } else if (event.key == "ArrowLeft") {
      this.direction = 3;
      this.setState({ speedX: -15, speedY: 0 , animation: "walkingLeft0"});
    } else if (event.key == 'e') {
      this.props.interraction(this.state.x, this.state.y);
    }
      switch(this.direction){
        case 0:
          this.idtimer = setInterval(() => {this.moveDown()}, 15);
          break;
        case 1:
          this.idtimer = setInterval(() => {this.moveRight()},15);
          break;
        case 2:
          this.idtimer = setInterval(() => {this.moveUp()},15);
          break;
        case 3:
          this.idtimer = setInterval(() => {this.moveLeft()}, 15);
      }
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
