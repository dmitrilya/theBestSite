import React, { Component } from "react";
import PrisonStart from "./Components/PrisonStart";
import Gym from "./Components/Gym";
import Farm from "./Components/Farm";
import { Stage, Layer } from "react-konva";
import Character from "./Components/Character";
import Pet from "./Components/Pet";
import Inventory from "./Components/Inventory";
import Shop from "./Components/Shop";

export default class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			numberOfRoom: 0, //номер комнаты (для построения)
			pet: false, //есть ли питомец
			turn: "character", //кем управлять (character/pet)
			shop: false
		};
		this.findedItems = { //список поднятых предметов
			key1: false,
			key2: false,
			shovel: false
		}
		this.openedDoors = [false]; //список отпертых дверей
		this.wherePerson = []; //путь до хозяина (комнаты, через которые прошел питомец без хозяина) см. в this.changeMode
		this.warning = false;
		this.keyDown = false;
	}

	//первые характеристики персонажа
  componentDidMount() {
		this.refs.character.changeCharacteristics(this.state.numberOfRoom);

		//добавление лисенеров
		document.addEventListener("keydown", event => {
			if (event.keyCode === 90) { // 'z' сменить управление (герой/питомец)
				if (this.state.pet && !this.refs.pet.mount) { //если питомец включен и он не маунт
					if (this.state.turn === "pet" && this.wherePerson.length === 0) this.setState({turn: "character"});
					//если управление питомцем и он не в другой комнате, сменить на героя
				  else this.setState({turn: "pet"}); //если управление героем, сменить на питомца
				}
			} else if (event.key == "i" || event.key == "ш" || event.key == "I" || event.key == "Ш") { //открыть/закрыть инвернтарь
        this.inventoryOpenClose();
      }	else if (event.keyCode == 49 || event.keyCode == 50 || event.keyCode == 51) {//смена скина питомца
				if (this.refs.character.speed === 9) {
					if (!this.state.pet) this.setState({pet: true/*, turn: "pet"*/}); //включить питомца и передать ему управление
	        this.refs.pet.setAnimal(event.keyCode, this.state.numberOfRoom); //сменить питомца
					this.isPetMount();
				}
      } else if (event.keyCode == 48) { // '0' удаление питомца
				if (this.state.turn === "pet") {
					if (this.wherePerson.length > 0) {
						if (this.wherePerson.length === 2) this.changeMode(this.wherePerson[1]); //чтобы по порядку вернуться в комнату, где герой
						this.changeMode(this.wherePerson[0]); //вернуться в комнату с героем после удаления
					}
					this.setState({turn: "character"});
				}
				this.refs.character.canMount = false;
				if (this.state.pet) this.setState({pet: false});
      } else {
				if (this.state.turn === "character") {
					this.refs.character.changeWay(event);
					if (this.refs.character.speed !== 9) this.refs.pet.changeWay(event);
				} else if (this.state.turn === "pet") {
					this.refs.pet.changeWay(event);
				}
			}
			this.keyDown = true;
		});

		document.addEventListener("keyup", () => {
			if (this.state.turn === "character") {
				this.refs.character.keyUp();
				if (this.refs.character.speed !== 9) this.refs.pet.keyUp();
			} else if (this.state.turn === "pet") {
				this.refs.pet.keyUp();
			}
			this.keyDown = false;
		});
  }

	//смена комнаты и характеристик персонажа
	changeMode = room => {
		if (this.state.turn === "character") {
			this.refs.character.changeCharacteristics(+room, +this.state.numberOfRoom);
			if (this.state.pet) this.refs.pet.changeCharacteristics(+room, +this.state.numberOfRoom);
			this.setState({ numberOfRoom: +room });
		} else { //если управление питомцем
			if (this.wherePerson.length === 0) this.refs.character.setState({opacity: 0}); //убрать героя при переходе

			//нельзя уйти питомцем дальше, чем на две комнаты
			//*********************************************************

			//если возвращаемся (новая комната равна последней) или произошло удаление
			//питомца (см в добавлении лисенеров) при длине массива три
			if (room == this.wherePerson[this.wherePerson.length-1]) {
				this.wherePerson.splice(-1, 1); //удалить последнюю комнату из пути до хозяина
				if (this.wherePerson.length === 0) { //вернуть героя, если вернулись в комнату, где ушли от хозяина
					this.refs.character.setState({opacity: 100});
				}
				this.refs.pet.changeCharacteristics(+room, +this.state.numberOfRoom);
				this.setState({ numberOfRoom: +room });
				this.warning = false; //после каждого перехода снова можно кинуть варнинг
			}
			else if (this.wherePerson.length < 2) { //добавить новую комнату в путь до хозяина
				this.wherePerson.push(+this.state.numberOfRoom);
				this.refs.pet.changeCharacteristics(+room, +this.state.numberOfRoom);
				this.setState({ numberOfRoom: +room });
				this.warning = false; //после каждого перехода снова можно кинуть варнинг
			}

			//*********************************************************
			else if (!this.warning) { //предупреждение при попытке уйти дальше двух комнат
				alert("нельзя так далеко от хозяина");
				this.warning = true; //чтобы варнинг был единожды
			}
		}
	};

	//открытие двери, если она отперта
	//*********************************************************
	openDoor = (numberOfDoor) => {
		switch (numberOfDoor) {
			case 0:
				if (this.openedDoors[0]) alert("типа в другой комнате)");
				else alert("дверь заперта");
				break;
		}
	}
	//*********************************************************

	//запуск диалога, относительно переданного номера диалога///
	//*********************************************************
	dialog = (numberOfDialog) => {
		switch (numberOfDialog) {
			case 0:
				this.refs.ps.dialog();
				break;
		}
	}
	//*********************************************************

	//открытие и закрытие инвентаря (opacity)//
	//******************************************
	inventoryOpenClose = () => {this.refs.inventory.inventoryOpenClose()}
	//******************************************

	//добавить в инвентаь//////////
	//*****************************************************
	addToInventory = (numberOfItem) => {
		if (this.refs.inventory.numberOfSlot()!==undefined) { //не поднимет, если не будет пустых слотов
			this.refs.inventory.addToInventory(numberOfItem);
			switch (numberOfItem) { //помечание поднятым и удаление с комнаты
				case 0:
					this.findedItems.key1 = true;
					this.refs.ps.deleteItem(numberOfItem);
					break;
				case 1:
					this.findedItems.key2 = true;
					this.refs.ps.deleteItem(numberOfItem);
					break;
				case 2:
					this.findedItems.shovel = true;
					this.refs.farm.deleteItem(numberOfItem);
					break;
			}
		}
	}
	//*****************************************************

	//проверка на маунта в changeCharacteristics у героя
	//*****************************************************
	isPetMount = () => {
		let mount = this.refs.pet.mount;
		this.refs.character.canMount = mount;
		if (mount) {
			this.refs.character.petCoords.x = this.refs.pet.x;
			this.refs.character.petCoords.y = this.refs.pet.y; //координаты маунта
			this.refs.character.mountSpeed = this.refs.pet.speed; //возвращает скорость маунта
			this.setState({turn: "character"});
		}
		else {
			this.refs.character.petCoords.x = null;
			this.refs.character.petCoords.y = null;
			this.refs.character.mountSpeed = null;
		}
	}
	//*****************************************************

	//передача координат маунта
	//**********************************************************
	mountCoords = () => {
		this.refs.character.petCoords.x = this.refs.pet.x;
		this.refs.character.petCoords.y = this.refs.pet.y;
	}
	//***********************************************************

	render() {
		const room = this.state.numberOfRoom;
		let roomOpenTeg,
				roomCloseTeg;

		if (room===0) {																	//построение комнаты по номеру
			roomOpenTeg = (<PrisonStart ref="ps" findedItems={this.findedItems}>);
			roomCloseTeg = (</PrisonStart>);
		} else if (room === 1) {
			roomOpenTeg = (<Gym ref="gym">);
			roomCloseTeg = (</Gym>);
		} else if (room === 2) {
			roomOpenTeg = (<Gym ref="gym">);
			roomCloseTeg = (</Gym>);
		} else if (room === 3) {
			roomOpenTeg = (<Farm ref="farm" findedItems={this.findedItems}>);
			roomCloseTeg = (</Farm>);
		}

		return (
			<Stage width={window.innerWidth-20} height={window.innerHeight-20}>
				<Layer>
					{roomOpenTeg}
					<Character ref="character" changeMode={this.changeMode} dialog={this.dialog} openDoor={this.openDoor}
					addToInventory={this.addToInventory} findedItems={this.findedItems}	mountCoords={this.mountCoords}/>
					{this.state.pet ? <Pet ref="pet" changeMode={this.changeMode} addToInventory={this.addToInventory}
														initRoom={this.state.numberOfRoom} findedItems={this.findedItems}/> : null}
					<Inventory ref="inventory" room={this.state.numberOfRoom} unlockDoor={(i) => {this.openedDoors[i] = true}}
					openedDoors={this.openedDoors}/>
					{this.state.shop ? <Shop/> : null}
					{roomCloseTeg}
				</Layer>
			</Stage>
		);
	}
}
