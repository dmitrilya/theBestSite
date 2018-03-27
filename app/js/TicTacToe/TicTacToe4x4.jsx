import React, {Component} from 'react';
import Input from './../Components/Input';

export default class TicTacToe3x3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: 'X',
      gameMap: [
        [
          '', '', '', ''
        ],
        [
          '', '', '', ''
        ],
        [
          '', '', '', ''
        ],
        [
          '', '', '', ''
        ]
      ]
    }
  }

  game = (event) => {
    if (event.target.value == '') {
      let turn = this.state.turn;
      let gameMap = this.state.gameMap;
      gameMap[event.target.name[0]][event.target.name[2]] = turn;
      event.target.value = turn;
      this.setState({
        turn: (turn == 'X')
          ? 'O'
          : 'X',
        gameMap: gameMap
      }, () => {
        this.props.someoneWin(turn, gameMap, this.btn0, this.btn1, this.btn2, this.btn3, this.btn4, this.btn5, this.btn6, this.btn7, this.btn8, this.btn9,
            this.btn10, this.btn11, this.btn12, this.btn13, this.btn14, this.btn15);
      });
    }
  }

  render() {
    return (<div className="window">
      <table className="table4">
        <tr>
          <td><Input className="cell" onClick={this.game} type="button" name="0,0" inputRef={input => this.btn0 = input}/></td>
          <td><Input className="cell" onClick={this.game} type="button" name="0,1" inputRef={input => this.btn1 = input}/></td>
          <td><Input className="cell" onClick={this.game} type="button" name="0,2" inputRef={input => this.btn2 = input}/></td>
          <td><Input className="cell" onClick={this.game} type="button" name="0,3" inputRef={input => this.btn3 = input}/></td>
        </tr>
        <tr>
          <td><Input className="cell" onClick={this.game} type="button" name="1,0" inputRef={input => this.btn4 = input}/></td>
          <td><Input className="cell" onClick={this.game} type="button" name="1,1" inputRef={input => this.btn5 = input}/></td>
          <td><Input className="cell" onClick={this.game} type="button" name="1,2" inputRef={input => this.btn6 = input}/></td>
          <td><Input className="cell" onClick={this.game} type="button" name="1,3" inputRef={input => this.btn7 = input}/></td>
        </tr>
        <tr>
          <td><Input className="cell" onClick={this.game} type="button" name="2,0" inputRef={input => this.btn8 = input}/></td>
          <td><Input className="cell" onClick={this.game} type="button" name="2,1" inputRef={input => this.btn9 = input}/></td>
          <td><Input className="cell" onClick={this.game} type="button" name="2,2" inputRef={input => this.btn10 = input}/></td>
          <td><Input className="cell" onClick={this.game} type="button" name="2,3" inputRef={input => this.btn11 = input}/></td>
        </tr>
        <tr>
          <td><Input className="cell" onClick={this.game} type="button" name="3,0" inputRef={input => this.btn12 = input}/></td>
          <td><Input className="cell" onClick={this.game} type="button" name="3,1" inputRef={input => this.btn13 = input}/></td>
          <td><Input className="cell" onClick={this.game} type="button" name="3,2" inputRef={input => this.btn14 = input}/></td>
          <td><Input className="cell" onClick={this.game} type="button" name="3,3" inputRef={input => this.btn15 = input}/></td>
        </tr>
      </table>
      <Input className="cell" onClick={this.props.changeMode} name="0" type="button"/>
    </div>)
  }
}
