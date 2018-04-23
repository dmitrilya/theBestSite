import React, { Component } from "react";
import { Sprite } from "react-konva";
import getCharacter from "./getCharacter";
import keydownListener from "./keydownListener";

export default class Character extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hero: null,
			animation: "stayRight",
			opacity: 100
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
		this.speed = 9;
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
		this.addToInventory = this.props.addToInventory;	//добавить в инвентарь
		this.dialog = this.props.dialog; //запуск диалога по номеру
		this.findedItems = this.props.findedItems; //список найденных предметов, чтобы не поднимать их дважды
		this.openDoor = this.props.openDoor; //взаимодействие с дверью
		this.changeWay = keydownListener; //см. импорты
		this.petCoords = {x: null, y: null};
		this.canMount;
	}

	//запуск спрайта героя
	componentDidMount() {
		this.sprite.start();
		var hero = new window.Image();
		hero.src = "./../../../src/img/walk.png";
		hero.onload = () => {
			this.setState({ hero });
		};
	}

	//смена характеристик героя при создании игры и при переходах между комнатами
	changeCharacteristics = (nextRoom, lastRoom) => {
		this.keyDown = false;			//снова можно реагировать на нажатие
		clearInterval(this.idTimer); //таймер сам не удалится при переходе (только при отжатии клавиши)
		let character = getCharacter(nextRoom, lastRoom, this.changeMode, this.dialog,
			this.addToInventory, this.findedItems, this.openDoor);
		this.x = character.startX;
		this.y = character.startY;
		this.minX = 	character.minX;
		this.minY = 	character.minY
		this.maxX = 	character.maxX;
		this.maxY = 	character.maxY;
		this.goTo = 	character.goTo;
		this.interraction = character.interraction;
	};

	//оседлать маунта
	//********************************************************************
	mount = () => {
		let petX = this.petCoords.x;
		let petY = this.petCoords.y;
		if (this.x > petX+10 && this.x < petX+150 && this.y > petY-50 && this.y < petY) {
			this.speed = this.props.mountSpeed();
		}
	}
	//********************************************************************

	//смена координат героя и проверка по функции goTo() на смену комнаты
	//********************************************************************
	update = (way) => {
		let x = this.x,
				y = this.y,
				speed = this.speed;

		if (x > this.minX && way === 37) {
			x -= speed;
			this.sprite.move({x: -speed});
		} else if (x < this.maxX && way === 39) {
			x += speed;
			this.sprite.move({x: speed});
		} else if (y > this.minY && way === 38) {
			y -= speed;
			this.sprite.move({y: -speed});
		} else if (y < this.maxY && way === 40) {
			y += speed;
			this.sprite.move({y: speed});
		}
		this.x = x;
		this.y = y;
		this.goTo(x, y);
	};
	//********************************************************************

	//отжатие клавиши
	//********************************************************************
	keyUp = () => {
		if (this.state.animation == "walkingRight") {
			this.setState({ animation: "stayRight" });
		} else if (this.state.animation == "walkingLeft") {
			this.setState({ animation: "stayLeft" });
		}
		if (this.speed !== 9) this.props.stopMount;
		this.keyDown = false;			//снова можно реагировать на нажатие
		clearInterval(this.idTimer); //удаление запросов на перемещение
	}
	//********************************************************************

	render() {
		return (<Sprite
				opacity={this.state.opacity}
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
