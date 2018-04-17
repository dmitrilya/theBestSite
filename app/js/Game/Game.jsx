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
		this.findedItems = {
			key1: false
		}
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
		this.refs.inventory.addToInventory(numberOfItem);
		switch (numberOfItem) {
			case 0:
				this.findedItems.key1 = true;
				this.refs.ps.deleteKey();
				break;
		}
	}
	//*****************************************************

	render() {
		const room = this.state.numberOfRoom;
		let roomOpenTeg,
			roomCloseTeg;


		if (room===0) {																	//построение комнаты по номеру
			roomOpenTeg = (<PrisonStart ref="ps" key1={this.findedItems.key1}>);
			roomCloseTeg = (</PrisonStart>);
		} else if (room === 1) {
			roomOpenTeg = (<Gym ref="gym">);
			roomCloseTeg = (</Gym>);
		}

		return (
			<Stage width={window.innerWidth - 50} height={window.innerHeight - 200}>
				<Layer>
					{roomOpenTeg}
					<Character ref="character" changeMode={this.changeMode} dialog={this.dialog}
					inventoryOpenClose={this.inventoryOpenClose} addToInventory={this.addToInventory} findedItems={this.findedItems}/>
					<Inventory ref="inventory"/>
					{roomCloseTeg}
				</Layer>
			</Stage>
		);
	}
}
