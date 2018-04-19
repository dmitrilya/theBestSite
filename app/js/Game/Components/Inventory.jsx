import React, { Component } from "react";
import { Image, Group, Circle } from "react-konva";

export default class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: {
        bg: null,
        key: null
      },
      opened: false,
      inventory: [ //инвентарь
        <Image/>, <Image/>, <Image/>, <Image/>, <Image/>, <Image/>, <Image/>, <Image/>,
        <Image/>, <Image/>, <Image/>, <Image/>, <Image/>, <Image/>, <Image/>, <Image/>
      ]
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

  //применение объекта (например, ключа к двери)
  //******************************************
  applyAnObject = (event) => {
    if (this.state.opened) {
      let xMouse = window.event.clientX;  //координаты курсора мыши
      let yMouse = window.event.clientY;  //координаты курсора мыши
      let inventory = this.state.inventory;

      for (var i = 0; i < inventory.length; i++) {              //нахождение предмета в инвентаре по названию********************
        if (inventory[i].props.name === event.target.name()) {  //(сложно работать через таргет. проще через пропсы в массиве)***

          switch (inventory[i].props.name) { //перебор по имени применяемого предмета

            case "Ключ от клуба":
              if (this.props.room == 0 && xMouse > 1314 && xMouse < 1429 && yMouse > 315 && yMouse < 559) { //где дропнул итем (по курсору)

                this.props.unlockDoor(0); //не выведена в отдельную функцию (в паренте). искать там, где прописываются пропсы инвентаря (в паренте)
                inventory[i].props = {};  //удаление итема из массива (обнуление пропсов)
              }
              else {
                inventory[i].props.x = inventory[i].x;
                inventory[i].props.y = inventory[i].y;
                //здесь Х и У - это координаты, которые прописаны не в пропсах, а сохраняются, как свойства
                //у всех итемов, чтобы можно было вернуть предмет на место, если не подходит (смотри this.addToInventory())
              }
              break;
          }

          this.setState({inventory: inventory});
          return;
        }
      }
    }
  }
  //******************************************

  inventoryOpenClose = () => {  //тут все понятно
    this.setState({opened: !this.state.opened});
  }

  //подсчет количества вещей в данный момент в инвентаре
  //******************************************
  numberOfSlot = () => {
    let inventory = this.state.inventory;
    let count = 0;

    for (var i = 0; i < inventory.length; i++) {
      if (inventory[i].props.image !== undefined) count++;
      else return count;
    }
  }
  //******************************************

  //предмет по номеру
  //******************************************
  item = (numberOfItem) => {
    switch (numberOfItem) {
      case 0:
        return (<Image image={this.state.img.key} name="Ключ от клуба" onMouseUp={this.applyAnObject} draggable={true}/>);
      case 1:
        return (<Image image={this.state.img.key} name="Ключ не от клуба" draggable={true}/>);
    }
  }
  //******************************************

  //добавить в инвентарь
	//*****************************************************
  addToInventory = (numberOfItem) => {
    console.log(this.props.openedDoors);
    let inventory = this.state.inventory;
    let numberOfSlot = this.numberOfSlot(); //куда добавить

    inventory[numberOfSlot] = this.item(numberOfItem); //само добавление в инвентарь (массив this.state.inventory)

    //просто координаты первого пустого слота
    if (numberOfSlot<8) { //первая строка инвентаря
      inventory[numberOfSlot].props.x=this.refs.inventory.x()+62*numberOfSlot+8;
      inventory[numberOfSlot].props.y=this.refs.inventory.y()+8;
      //вспомогательные координаты, которые не меняются при drag-drop, чтобы вернуть на место
      inventory[numberOfSlot].x=this.refs.inventory.x()+62*numberOfSlot+8;
      inventory[numberOfSlot].y=this.refs.inventory.y()+8;
    }
    else {
      inventory[numberOfSlot].props.x=this.refs.inventory.x()+62*(numberOfSlot-8)+8;
      inventory[numberOfSlot].props.y=this.refs.inventory.y()+70;
      //вспомогательные координаты, которые не меняются при drag-drop, чтобы вернуть на место
      inventory[numberOfSlot].x=this.refs.inventory.x()+62*(numberOfSlot-8)+8;
      inventory[numberOfSlot].y=this.refs.inventory.y()+70;
    }
    this.setState({inventory: inventory});
  }
  //*****************************************************

  render() {
    let opacity, //прозрачность (открыт/закрыт)
        inventory = this.state.inventory;

    if (!this.state.opened) opacity = 0;	//показать/скрыть инвентарь
    else opacity = 100;

    return(<Group opacity={opacity}>
      <Image ref="inventory" image={this.state.img.bg} x={400} y={410} />
      {inventory.map(item => item)}
    </Group>)
  }
}
