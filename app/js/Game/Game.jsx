import React, { Component } from "react";
import PrisonStart from "./Components/PrisonStart";
import Gym from "./Components/Gym";
import { Stage, Layer } from "react-konva";
import Character from "./Components/Character";

export default class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			numberOfRoom: 0,
			/*room: {
				open: null,
				close: null
			}*/
		};
	}

	//первые характеристики персонажа
  componentDidMount() {
		this.refs.character.changeCharacteristics(this.state.numberOfRoom);
  }

	//смена комнаты и характеристик персонажа
	changeMode = room => {
		this.setState({ numberOfRoom: +room });
		this.refs.character.changeCharacteristics(this.state.numberOfRoom);
	};

	render() {
		const room = this.state.numberOfRoom;
		let roomOpenTeg,
			roomCloseTeg;

		//
		if (room===0) {
			roomOpenTeg = (<PrisonStart>);
			roomCloseTeg = (</PrisonStart>);
		} else if (room === 1) {
			roomOpenTeg = (<Gym ref="gym">);
			roomCloseTeg = (</Gym>);
		}

		return (
			<Stage width={window.innerWidth - 50} height={window.innerHeight - 200}>
				<Layer>
					{roomOpenTeg}
					<Character ref="character" changeMode={this.changeMode}/>
					{roomCloseTeg}
				</Layer>
			</Stage>
		);
	}
}
