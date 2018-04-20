import React, { Component } from "react";
import PrisonStart from "./Components/PrisonStart";
import Gym from "./Components/Gym";
import { Stage, Layer } from "react-konva";
import Character from "./Components/Character";
import Pet from "./Components/Pet";
import Inventory from "./Components/Inventory";

export default class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			numberOfRoom: 0, //номер комнаты (для построения)
			pet: false, //есть ли питомец
			turn: "character" //кем управлять (character/pet)
		};
		this.findedItems = { //список поднятых предметов
			key1: false,
			key2: false
		}
		this.openedDoors = [false]; //список отпертых дверей
		this.wherePerson = []; //путь до хозяина (комнаты, через которые прошел питомец без хозяина) см. в this.changeMode
		this.warning = false;
	}

	//первые характеристики персонажа
  componentDidMount() {
		this.refs.character.changeCharacteristics(this.state.numberOfRoom);

		//добавление лисенеров
		document.addEventListener("keydown", event => {
			if (event.keyCode === 90) { //сменить управление (герой/питомец)
				if (this.state.pet) {
				this.state.turn === "pet" ? this.setState({turn: "character"}) : this.setState({turn: "pet"});
				}
			} else if (event.key == "i" || event.key == "ш" || event.key == "I" || event.key == "Ш") { //открыть/закрыть инвернтарь
        this.inventoryOpenClose();
      }	else if (event.keyCode == 49 || event.keyCode == 50 || event.keyCode == 51) { //смена скина питомца
				if (!this.state.pet) this.setState({pet: true, turn: "pet"});
        this.refs.pet.setAnimal(event.keyCode);
      } else if (event.keyCode == 48) { //смена скина питомца
				if (this.state.turn === "pet") {
					this.setState({turn: "character"});
				}
				this.setState({pet: false});
      } else {
				if (this.state.turn === "character" && this.wherePerson.length === 0) {
					this.refs.character.changeWay(event);
				} else if (this.state.turn === "pet") {
					this.refs.pet.changeWay(event);
				}
			}
		});

		document.addEventListener("keyup", () => {
			if (this.state.turn === "character") {
				this.refs.character.keyUp();
			} else if (this.state.turn === "pet") {
				this.refs.pet.keyUp();
			}
		});
  }

	//смена комнаты и характеристик персонажа
	changeMode = room => {
		if (this.state.turn === "character") {
			this.refs.character.changeCharacteristics(+room, +this.state.numberOfRoom);
			this.refs.pet.changeCharacteristics(+room, +this.state.numberOfRoom);
			this.setState({ numberOfRoom: +room });
		} else { //если управление питомцем
			if (this.wherePerson.length === 0) this.refs.character.setState({opacity: 0}); //убрать героя при переходе

			//нельзя уйти питомцем дальше, чем на две комнаты
			//*********************************************************
			if (this.wherePerson.length < 3) {
				this.refs.pet.changeCharacteristics(+room, +this.state.numberOfRoom);

				if (room == this.wherePerson[this.wherePerson.length-1]) { //если возвращаемся (новая комната равна последней)
					this.wherePerson.splice(-1, 1); //удалить последнюю комнату из пути до хозяина
					if (this.wherePerson.length === 0) { //вернуть героя, если вернулись в комнату, где ушли от хозяина
						this.refs.character.setState({opacity: 100});
					}
				} else if (this.wherePerson.length < 2) { //добавить новую комнату в путь до хозяина
					this.wherePerson.push(+this.state.numberOfRoom);
				}
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
			}
		}
	}
	//*****************************************************

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
		}

		return (
			<Stage width={window.innerWidth-20} height={window.innerHeight-20}>
				<Layer>
					{roomOpenTeg}
					<Character ref="character" changeMode={this.changeMode} dialog={this.dialog} openDoor={this.openDoor}
					addToInventory={this.addToInventory} findedItems={this.findedItems}/>
					{this.state.pet ? <Pet ref="pet" changeMode={this.changeMode} addToInventory={this.addToInventory}
														initRoom={this.state.numberOfRoom} findedItems={this.findedItems}/> : null}
					<Inventory ref="inventory" room={this.state.numberOfRoom} unlockDoor={(i) => {this.openedDoors[i] = true}} openedDoors={this.openedDoors}/>
					{roomCloseTeg}
				</Layer>
			</Stage>
		);
	}
}
