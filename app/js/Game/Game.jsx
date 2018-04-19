import React, { Component } from "react";
import PrisonStart from "./Components/PrisonStart";
import Gym from "./Components/Gym";
import { Stage, Layer } from "react-konva";
import Character from "./Components/Character";
import Inventory from "./Components/Inventory";

export default class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			numberOfRoom: 0
		};
		this.findedItems = { //список поднятых предметов
			key1: false,
			key2: false
		}
		this.openedDoors = [false]; //список отпертых дверей
	}

	//первые характеристики персонажа
  componentDidMount() {
		this.refs.character.changeCharacteristics(this.state.numberOfRoom);
  }

	//смена комнаты и характеристик персонажа
	changeMode = room => {
		this.refs.character.changeCharacteristics(+room);
		this.setState({ numberOfRoom: +room });
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
		}

		return (
			<Stage width={window.innerWidth-20} height={window.innerHeight-20}>
				<Layer>
					{roomOpenTeg}
					<Character ref="character" changeMode={this.changeMode} dialog={this.dialog} openDoor={this.openDoor}
					inventoryOpenClose={this.inventoryOpenClose} addToInventory={this.addToInventory} findedItems={this.findedItems}/>
					<Inventory ref="inventory" room={this.state.numberOfRoom} unlockDoor={(i) => {this.openedDoors[i] = true}} openedDoors={this.openedDoors}/>
					{roomCloseTeg}
				</Layer>
			</Stage>
		);
	}
}
