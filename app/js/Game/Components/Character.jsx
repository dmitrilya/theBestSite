import React, {Component} from 'react';
import {Circle} from 'react-konva';

export default class Character extends Component {
  constructor(props){
    super(props);
    this.state = {
      x: 20,
      y: 15,
      speedX: 0,
      speedY: 0
    };
  }

  componentDidMount() {
		this.idTimer = setInterval(() => {
			this.update();
		}, 50);
		window.addEventListener("keydown", event => {
			this.changeWay(event);
		});
    window.addEventListener("keyup", event => {
			this.setState({speedX: 0, speedY: 0});
		});
	}

  update = () => {
		this.setState({
			x: this.state.x + this.state.speedX,
			y: this.state.y + this.state.speedY
		});
	};

  changeWay = event => {
    if (event.key == "ArrowDown") {
      this.setState({ speedX: 0, speedY: 5 });
    } else if (event.key == "ArrowRight") {
      this.setState({ speedX: 5, speedY: 0 });
    } else if (event.key == "ArrowUp") {
      this.setState({ speedX: 0, speedY: -5 });
    } else if (event.key == "ArrowLeft") {
      this.setState({ speedX: -5, speedY: 0 });
    }
  };

  render(){
    return(
      <Circle fill="yellow" x={this.state.x} y={this.state.y} radius={10}/>
    )
  }
}
