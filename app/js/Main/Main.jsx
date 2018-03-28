import React, {Component} from "react";
import BlackJack from "./../BlackJack/BlackJack";
import Game from "./../Game/Game";
import Pare from "./../Pare/Pare";
import TicTacToe from "./../TicTacToe/TicTacToe";
import Menu from "./../Components/Menu";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 0
    };
  }

  changeMode = event => {
    this.setState({
      mode: + event.target.name
    });
  };

  render() {
    switch (this.state.mode) {
      case 0:
        {
          return (<div>
          <Menu changeMode={this.changeMode}/>
          </div>);
        }
      case 1:
        {
          return (<div>
            <Menu changeMode={this.changeMode}/>
            <BlackJack/>
          </div>);
        }
      case 2:
        {
          return (<div>
            <Menu changeMode={this.changeMode}/>
            <Game/>
          </div>);
        }
      case 3:
        {
          return (<div>
            <Menu changeMode={this.changeMode}/>
            <Pare/>
          </div>);
        }
      case 4:
        {
          return (<div>
            <Menu changeMode={this.changeMode}/>
            <TicTacToe/>
          </div>);
        }
    }
  }
}
