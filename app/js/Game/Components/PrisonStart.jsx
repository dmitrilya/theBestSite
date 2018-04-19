import React, { Component } from "react";
import { Image, Group, Text } from "react-konva";
import Bum from "./Bum";

export default class PrisonStart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			img: {
				bg: null,
				dialogImg: null,
				key1: null,
				key2: null
			},
			dialog: {
				numberOfDialog: 0,		//порядковый номер текста
				dialogText: null,			//текст по номеру
				dialogView: null			//dom елемент с бг и текстом
			}
		};
	}

	componentDidMount() {
		let img = this.state.img;
		img.bg = new window.Image();
		img.bg.src = "../../../src/img/prisonStart.jpg";
		img.bg.onload = () => {
			this.setState({ img: img });
		};
		img.dialogImg = new window.Image();
		img.dialogImg.src = "../../../src/img/scrollForDialog.png";
		img.dialogImg.onload = () => {
			this.setState({ img: img });
		};
		if (!this.props.findedItems.key1) { //	если не удален
			img.key1 = new window.Image();
			img.key1.src = "../../../src/img/key2.png";
			img.key1.onload = () => {
				this.setState({ img: img });
			};
		}
		if (!this.props.findedItems.key2) { //	если не удален
			img.key2 = new window.Image();
			img.key2.src = "../../../src/img/key2.png";
			img.key2.onload = () => {
				this.setState({ img: img });
			};
		}
	}z

	deleteItem(numberOfItem) { //удалить итем с комнаты по номеру
		let img = this.state.img;
		switch (numberOfItem) {
			case 0:
				img.key1 = null;
				break;
			case 1:
				img.key2 = null;
				break;
		}
		this.setState({img: img})
	}

	keySkip = (event) => { //проверка на enter (скип в диалогах)
		if (event.keyCode == 13
		) this.dialog();
	}

	dialog = () => {
		if (this.state.dialog.numberOfDialog<4) { 								//	зависит от кол-ва диалогов.
			this.nextDialogText(this.state.dialog.numberOfDialog);	//	если номер меньше крайнего, то изменит
			this.dialogWithBum();																		//	текст и обновит view диалога
		}
		else {
			let dialog = this.state.dialog;
			dialog.numberOfDialog = 0;															//	иначе обновит текст и view
			dialog.dialogText = null;																//	и удалит лисенеры
			dialog.dialogView = null;
			this.setState({dialog: dialog});
			window.removeEventListener("click", this.dialog);
			window.removeEventListener("keydown", this.keySkip);
		}
	}

	//выбор текста диалога
	//********************************************************************
	nextDialogText = (number) => {
		let dialog = this.state.dialog;
		switch (number) {
			case 0:
				dialog.dialogText = (<Text text="Hello" x={400} y={230} fontSize={40} />);
				dialog.numberOfDialog++;
			break;
			case 1:
				dialog.dialogText = (<Text text="Lol" x={420} y={230} fontSize={40} />);
				dialog.numberOfDialog++;
			break;
			case 2:
				dialog.dialogText = (<Text text="Kek" x={415} y={230} fontSize={40} />);
				dialog.numberOfDialog++;
			break;
			case 3:
				dialog.dialogText = (<Text text="Cheburek" x={365} y={230} fontSize={40} />);
				dialog.numberOfDialog++;
			break;
		}
		this.setState({ dialog: dialog });
	}
	//********************************************************************

	//обновление view диалога
	//********************************************************************
	dialogWithBum = () => {
		if (this.state.dialog.numberOfDialog===1) {
			window.addEventListener("click", this.dialog);			//	создание лисенеров на скип
			window.addEventListener("keydown", this.keySkip);
		}
		let dialog = this.state.dialog;
		dialog.dialogView = (
			<Group>
				<Image image={this.state.img.dialogImg} x={300} y={50} width={300} height={400}/>
				{this.state.dialog.dialogText}
			</Group>
		);
		this.setState({
			dialog: dialog
		});
	};
	//********************************************************************

	render() {
		return (
			<Group>
				<Image image={this.state.img.bg} width={window.innerWidth0} height={window.innerHeight}/>
				<Bum />
				<Image image={this.state.img.key1} x={700} y={550}/>
				<Image image={this.state.img.key2} x={780} y={550}/>
				{this.state.dialog.dialogView}
			</Group>
		);
	}
}
