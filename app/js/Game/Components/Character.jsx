import React, { Component } from "react";
import { Sprite } from "react-konva";
import getCharacter from "./getCharacter";

export default class Character extends Component {
	constructor(props) {
		super(props);
		this.state = {
			speedX: 0,
			speedY: 0,
			hero: null,
			animation: "stayRight"
		};
		this.animations = {
      stayRight: [0, 0, 53, 136],
      stayLeft: [0, 137, 53, 136],
      walkingRight: [0, 0, 53, 136,
                    53, 0, 53, 136,
                    106, 0,  53, 136,
                    159, 0, 53, 136,
                    212, 0, 53, 136,
                    265, 0, 53, 136,
										318, 0, 53, 136,
                    371, 0, 53, 136,
                    424, 0,  53, 136,
                    477, 0, 53, 136,
                    530, 0, 53, 136,
                    583, 0, 53, 136,
										636, 0, 53, 136,
                    689, 0, 53, 136,
                    742, 0,  53, 136,
                    793, 0, 53, 136,
                    846, 0, 53, 136,
                    899, 0, 53, 136,
										952, 0, 53, 136,
										1005, 0, 53, 136],
      walkingLeft: [0, 137, 53, 136,
                    53, 137, 53, 136,
                    106, 137,  53, 136,
                    159, 137, 53, 136,
                    212, 137, 53, 136,
                    265, 137, 53, 136,
										318, 137, 53, 136,
                    371, 137, 53, 136,
                    424, 137,  53, 136,
                    477, 137, 53, 136,
                    530, 137, 53, 136,
                    583, 137, 53, 136,
										636, 137, 53, 136,
                    689, 137, 53, 136,
                    742, 137,  53, 136,
                    793, 137, 53, 136,
                    846, 137, 53, 136,
                    899, 137, 53, 136,
										952, 137, 53, 136,
										1005, 137, 53, 136]
    };
		this.idTimer; //запросы на перемещение
		this.keyDown = false; //чтобы лисенер реагировал единожды на нажатие//
		this.x = null; //************координаты*****************
		this.y = null; //**************героя*******************
		this.minX = 	null; //***********************************
		this.minY = 	null; //координаты возможного премещения***
		this.maxX = 	null; //***********************************
		this.maxY = 	null; //***********************************
		this.goTo = 	null; //функция перехода между комнатами
		this.interraction = 	null; //функция взаимодействия ('e', 'у'-русская)
		this.changeMode = this.props.changeMode; 	//функция смены комнаты
		this.inventoryOpenClose = this.props.inventoryOpenClose; 		//функция открытия/закрытия инвентаря
		this.addToInventory = this.props.addToInventory;
		this.dialog = this.props.dialog;
		this.findedItems = this.props.findedItems;
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
			this.keyDown = false;			//снова можно реагировать на нажатие
			clearInterval(this.idTimer); //удаление запросов на перемещение
		});
		var hero = new window.Image();
		hero.src = "./../../../src/img/walk.png";
		hero.onload = () => {
			this.setState({
				hero: hero
			});
		};
	}

	//смена характеристик героя при создании игры и при последующих переходах между комнатами
	changeCharacteristics = room => {
		this.keyDown = false;			//снова можно реагировать на нажатие
		clearInterval(this.idTimer);
		let character = getCharacter(room, this.changeMode, this.dialog, this.addToInventory, this.findedItems);
		this.x = character.startX;
		this.y = character.startY;
		this.minX = 	character.minX;
		this.minY = 	character.minY
		this.maxX = 	character.maxX;
		this.maxY = 	character.maxY;
		this.goTo = 	character.goTo;
		this.interraction = character.interraction;
	};

	//смена координат героя и проверка по функции goTo() на смену комнаты
	//********************************************************************
	update = () => {
		let x = this.x,
			y = this.y,
			speedX = this.state.speedX,
			speedY = this.state.speedY;

		if (x > this.minX && speedX < 0) {
			x += speedX;
			this.sprite.move({x: speedX});
		} else if (x < this.maxX && speedX > 0) {
			x += speedX;
			this.sprite.move({x: speedX});
		} else if (y > this.minY && speedY < 0) {
			y += speedY;
			this.sprite.move({y: speedY});
		} else if (y < this.maxY && speedY > 0) {
			y += speedY;
			this.sprite.move({y: speedY});
		}
		this.x = x;
		this.y = y;
		this.goTo(x, y);
	};
	//********************************************************************

	//keydown listener
	//********************************************************************
	changeWay = event => {
		let anim = this.state.animation;
		if (!this.keyDown) {
			if (event.key == "ArrowDown") {
				this.setState({ speedX: 0, speedY: 9 });
				if (anim == "stayRight") {
					this.setState({ animation: "walkingRight" });
				} else if (anim == "stayLeft") {
					this.setState({ animation: "walkingLeft" });
				}
			} else if (event.key == "ArrowRight") {
				this.setState({ speedX: 9, speedY: 0, animation: "walkingRight" });
			} else if (event.key == "ArrowUp") {
				this.setState({ speedX: 0, speedY: -9 });
				if (anim == "stayRight") {
					this.setState({ animation: "walkingRight" });
				} else if (anim == "stayLeft") {
					this.setState({ animation: "walkingLeft" });
				}
			} else if (event.key == "ArrowLeft") {
				this.setState({ speedX: -9, speedY: 0, animation: "walkingLeft" });
			} else if (event.key == "e" || event.key == "у" || event.key == "E" || event.key == "У") {
				this.interraction(this.x, this.y);
			} else if (event.key == "i" || event.key == "ш" || event.key == "I" || event.key == "Ш") {
				this.inventoryOpenClose();
			}
			this.idTimer = setInterval(() => {//**********************************
				this.update();									//создание запросов на перемещение**
			}, 60);														//**********************************
			this.keyDown = true; //больше не реагировать
		}
	};
	//********************************************************************

	render() {
		return (<Sprite
				ref={sprite => {
					this.sprite = sprite;
				}}
				x={this.x}
				y={this.y}
				image={this.state.hero}
				animation={this.state.animation}
				animations={this.animations}
				frameRate={32}
				frameIndex={0}
			/>);
	}
}
