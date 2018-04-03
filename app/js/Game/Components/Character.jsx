import React, { Component } from "react";
import { Sprite } from "react-konva";
import getCharacter from "./getCharacter";

export default class Character extends Component {
	constructor(props) {
		super(props);
		this.state = {
			x: this.startX,
			y: this.startY,
			speedX: 0,
			speedY: 0,
			hero: null,
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
		this.idtimer; //запросы на перемещение
		this.keyDown = false; //чтобы лисенер реагировал единожды на нажатие
		this.startX = null;
		this.startY = null;
		this.minX = 	null; //***********************************
		this.minY = 	null; //координаты возможного премещения***
		this.maxX = 	null; //***********************************
		this.maxY = 	null; //***********************************
		this.goTo = 	null; //функция перехода между комнатами
		this.interraction = 	null; //функция взаимодействия ('e', 'у'-русская)
		this.changeMode = this.props.changeMode; //функция смены комнаты
	}

	//запуск спрайта героя, добавление лисенеров
	componentDidMount() {
		this.sprite.start();
		document.addEventListener("keydown", event => {
			this.changeWay(event);
		});
		document.addEventListener("keyup", event => {
			this.setState({ speedX: 0, speedY: 0 });
			if (this.state.animation == "walkingRight") {
				this.setState({ animation: "stayRight" });
			} else if (this.state.animation == "walkingLeft") {
				this.setState({ animation: "stayLeft" });
			}
			this.keyDown = false; //снова можно реагировать на нажатие
			clearInterval(this.idtimer); //удаление запросов на перемещение
		});
		var hero = new window.Image();
		hero.src = "./../../../src/img/mainHero.png";
		hero.onload = () => {
			this.setState({
				hero: hero
			});
		};
	}

	//смена характеристик героя при создании игры и при последующих переходах между комнатами
	changeCharacteristics = room => {
		let character = getCharacter(room, this.changeMode);
		this.startX = character.startX;
		this.startY = character.startY;
		this.minX = 	character.minX;
		this.minY = 	character.minY
		this.maxX = 	character.maxX;
		this.maxY = 	character.maxY;
		this.goTo = 	character.goTo;
		this.interraction = character.interraction;
		this.setState({
			x: this.startX,
			y: this.startY
		})
	};

	//смена координат героя и проверка по функции goTo() на смену комнаты
	//********************************************************************
	update = () => {
		let x = this.state.x,
			y = this.state.y,
			speedX = this.state.speedX,
			speedY = this.state.speedY;

		if (x > this.minX && speedX < 0) {
			this.setState({
				x: x + speedX,
				y: y + speedY
			});
		} else if (x < this.maxX && speedX > 0) {
			this.setState({
				x: x + speedX,
				y: y + speedY
			});
		} else if (y > this.minY && speedY < 0) {
			this.setState({
				x: x + speedX,
				y: y + speedY
			});
		} else if (y < this.maxY && speedY > 0) {
			this.setState({
				x: x + speedX,
				y: y + speedY
			});
		}
		this.goTo(this.state.x, this.state.y);
	};
	//********************************************************************

	//keydown listener
	//********************************************************************
	changeWay = event => {
		let anim = this.state.animation;
		if (!this.keyDown) {
			if (event.key == "ArrowDown") {
				this.setState({ speedX: 0, speedY: 15 });
				if (anim == "stayRight") {
					this.setState({ animation: "walkingRight" });
				} else if (anim == "stayLeft") {
					this.setState({ animation: "walkingLeft" });
				}
			} else if (event.key == "ArrowRight") {
				this.setState({ speedX: 15, speedY: 0, animation: "walkingRight" });
			} else if (event.key == "ArrowUp") {
				this.setState({ speedX: 0, speedY: -15 });
				if (anim == "stayRight") {
					this.setState({ animation: "walkingRight" });
				} else if (anim == "stayLeft") {
					this.setState({ animation: "walkingLeft" });
				}
			} else if (event.key == "ArrowLeft") {
				this.setState({ speedX: -15, speedY: 0, animation: "walkingLeft" });
			} else if (event.key == "e" || event.key == "у") {
				this.interraction(this.state.x, this.state.y);
			}
			this.idtimer = setInterval(() => {//**********************************
				this.update();									//создание запросов на перемещение**
			}, 60);														//**********************************
			this.keyDown = true; //больше не реагировать
		}
	};
	//********************************************************************

	render() {
		return (
			<Sprite
				ref={sprite => {
					this.sprite = sprite;
				}}
				x={this.state.x}
				y={this.state.y}
				image={this.state.hero}
				animation={this.state.animation}
				animations={this.animations}
				frameRate={0}
				frameIndex={0}
			/>
		);
	}
}
