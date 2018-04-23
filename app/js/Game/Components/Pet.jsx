import React, {Component} from "react";
import { Image, Sprite } from "react-konva";
import getPet from "./getPet";
import keydownListener from "./keydownListener";

export default class Pet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: {
        dog: null,
        chicken: null
      },
      animation: "stayRight",
      skin: null
    }
    this.animations; //анимации для спрайта
    this.mount; //является ли питомец маунтом
    this.speed = null;
    this.idTimer; //запросы на перемещение
		this.keyDown = false; //чтобы лисенер реагировал единожды на нажатие//
		this.x = null; //************координаты*****************
		this.y = null; //**************питомца*******************
		this.minX = 	null; //***********************************
		this.minY = 	null; //координаты возможного премещения***
		this.maxX = 	null; //***********************************
		this.maxY = 	null; //***********************************
		this.goTo = 	null; //функция перехода между комнатами
		this.interraction = 	null; //функция взаимодействия ('e', 'у'-русская)
		this.changeMode = this.props.changeMode; 	//функция смены комнаты
		this.addToInventory = this.props.addToInventory;	//добавить в инвентарь
		this.findedItems = this.props.findedItems; //список найденных предметов, чтобы не поднимать их дважды
		this.changeWay = keydownListener; //см. импорты
  }

  componentDidMount() {
    this.changeCharacteristics(this.props.initRoom);
    this.sprite.start();
    let { img } = this.state;
    img.dog = new window.Image();
		img.dog.src = "../../../src/img/game/pets/dogW.png";
		img.dog.onload = () => {
			this.setState({ img });
		};
    img.chicken = new window.Image();
		img.chicken.src = "../../../src/img/game/pets/chickenW.png";
		img.chicken.onload = () => {
			this.setState({ img });
		};
  }

  setAnimal = (anim) => {
    switch (anim) {
      case 49:
        this.animations = {
          stayRight: [0, 0, 90, 58],
          stayLeft: [0, 59, 90, 58],
          walkingRight: [0, 0, 90, 58,
                        91, 0, 90, 58,
                        182, 0,  90, 58,
                        273, 0, 90, 58,
                        364, 0, 90, 58,
                        455, 0, 90, 58],
          walkingLeft: [0, 59, 90, 58,
                        91, 59, 90, 58,
                        182, 59,  90, 58,
                        273, 59, 90, 58,
                        364, 59, 90, 58,
                        455, 59, 90, 58]
        };
        this.mount = true;
        this.speed = 40;
        this.setState({skin: this.state.img.dog})
        break;
        case 50:
          this.animations = {
            stayRight: [50, 51, 50, 49],
            stayLeft: [50, 0, 50, 49],
            walkingRight: [0, 51, 50, 49,
                          50, 51, 50, 49,
                          100, 51,  50, 48],
            walkingLeft: [0, 0, 50, 49,
                          50, 0, 50, 49,
                          100, 0,  50, 48]
          };
          this.mount = false;
          this.speed = 30;
          this.setState({skin: this.state.img.chicken})
          break;
    }
  }

  //смена характеристик питомца при создании игры и при последующих переходах между комнатами
	changeCharacteristics = (nextRoom, lastRoom) => {
		this.keyDown = false;			//снова можно реагировать на нажатие
		clearInterval(this.idTimer);
		let pet = getPet(nextRoom, lastRoom, this.changeMode, this.addToInventory, this.findedItems);
		this.x = pet.startX;
		this.y = pet.startY;
		this.minX = 	pet.minX;
		this.minY = 	pet.minY
		this.maxX = 	pet.maxX;
		this.maxY = 	pet.maxY;
		this.goTo = 	pet.goTo;
		this.interraction = pet.interraction;
    this.skin = pet.skin;
	};

	//смена координат питомца и проверка по функции goTo() на смену комнаты
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
		this.keyDown = false;			//снова можно реагировать на нажатие
		clearInterval(this.idTimer); //удаление запросов на перемещение
	}
  //********************************************************************

  render() {
    return (<Sprite
				ref={sprite => {
					this.sprite = sprite;
				}}
				x={this.x}
				y={this.y}
				image={this.state.skin}
				animation={this.state.animation}
				animations={this.animations}
				frameRate={32}
				frameIndex={0}
			/>);
  }
}
