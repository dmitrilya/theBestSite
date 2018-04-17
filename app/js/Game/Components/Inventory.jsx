import React, { Component } from "react";
import { Image, Group } from "react-konva";

export default class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: {
        bg: null,
        key: null
      },
      opened: false,
      inventory: { //инвентарь
        i0: null,
        i1: null,
        i2: null,
        i3: null,
        i4: null,
        i5: null,
        i6: null,
        i7: null,
        i8: null,
        i9: null,
        i10: null,
        i11: null,
        i12: null,
        i13: null,
        i14: null,
        i15: null
      }
    }
  }

  componentDidMount() {
    let img = this.state.img;
		img.bg = new window.Image();
		img.bg.src = "../../../src/img/inventory.png";
		img.bg.onload = () => {
			this.setState({ img: img });
		};
    img.key = new window.Image();
		img.key.src = "../../../src/img/key2.png";
		img.key.onload = () => {
			this.setState({ img: img });
		};
  }

  inventoryOpenClose = () => {
    this.setState({opened: !this.state.opened});
  }

  //подсчет количества вещей в данный момент в инвентаре
  //******************************************
  howManyItems = () => {
    let inventory = this.state.inventory;
    let count = 0;

    for (let item in inventory) {
      if (inventory[item]!==null) count++
      else return count;
    }
  }
  //******************************************

  //предмет по номеру
  //******************************************
  item = (numberOfItem) => {
    switch (numberOfItem) {
      case 0:
        return this.state.img.key;
    }
  }
  //******************************************

  //добавить в инвентаь
	//*****************************************************
  addToInventory = (numberOfItem) => {
    let inventory = this.state.inventory
    let numberOfSlot = this.howManyItems(); //куда добавить
    switch (numberOfSlot) {
      case 0:
        inventory.i0 = (<Image image={this.item(numberOfItem)} x={this.refs.inventory.x()+8} y={this.refs.inventory.y()+8} draggable={true}/>)
        break;
    }
    this.setState({inventory: inventory})
  }
  //*****************************************************

  render() {
    let opacity;

    if (!this.state.opened) opacity = 0;	//показать/скрыть инвентарь
    else opacity = 100;

    return(<Group opacity={opacity}>
      <Image ref="inventory" image={this.state.img.bg} x={400} y={410} />
      {this.state.inventory.i0}
    </Group>)
  }
}
