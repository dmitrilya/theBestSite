import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TicTacToe3x3 from './Components/TicTacToe3x3';
import TicTacToe4x4 from './Components/TicTacToe4x4';
import TicTacToe5x5 from './Components/TicTacToe5x5';
import Input from './Components/Input';

class TicTacToe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 0
    }
  }

  someoneWin = (turn, gameMap, ...btns) => {
    var count = 0;
    var ch;
    //Rows
    for (var i = 0; i < gameMap[0].length; i++) {
      ch = gameMap[i][0];
      for (var j = 0; j < gameMap.length; j++) {
        if (gameMap[i][j] == ch && gameMap[i][j] != "") {
          count++;
        } else {
          ch = gameMap[i][j];
          count = 1;
        }
        if (count == 3) {
          this.block(turn, btns);
          return;
        }
      }
      count = 0;
    }
    count = 0;
    //Collums
    for (var i = 0; i < gameMap[0].length; i++) {
      ch = gameMap[0][i];
      for (var j = 0; j < gameMap.length; j++) {
        if (gameMap[j][i] == ch && gameMap[j][i] != "") {
          count++;
        } else {
          ch = gameMap[j][i];
          count = 1;
        }
        if (count == 3) {
          this.block(turn, btns);
          return;
        }
      }
      count = 0;
    }
    count = 0;
    var row = 0;
    //Diagonal
    for (var i = gameMap[0].length - 3; i >= 0; i--) {
      ch = gameMap[row][i];
      for (var j = i; j < gameMap[0].length; j++) {
        if (gameMap[row][j] == ch && gameMap[row][j] != "") {
          row++;
          count++;
        } else {
          ch = gameMap[row][j];
          row++;
          count = 1;
        }
        if (count == 3) {
          this.block(turn, btns);
          return;
        }
      }
      count = 0;
      row = 0;
    }
    var col = 0;
    for (var i = 1; i < gameMap.length - 2; i++) {
      ch = gameMap[i][col];
      for (var j = i; j < gameMap.length; j++) {
        if (gameMap[j][col] == ch && gameMap[j][col] != "") {
          col++;
          count++;
        } else {
          ch = gameMap[j][col];
          col++;
          count = 1;
        }
        if (count == 3) {
          this.block(turn, btns);
          return;
        }
      }
      count = 0;
      col = 0;
    }
    //Diagonal2
    row = 0;
    for (var i = 2; i < gameMap[0].length; i++) {
      ch = gameMap[row][i];
      for (var j = i; j >= 0; j--) {
        if (gameMap[row][j] == ch && gameMap[row][j] != "") {
          row++;
          count++;
        } else {
          ch = gameMap[row][j];
          row++;
          count = 1;
        }
        if (count == 3) {
          this.block(turn, btns);
          return;
        }
      }
      count = 0;
      row = 0;
    }
     col = gameMap[0].length-1;
    for (var i = 1; i < gameMap.length - 2; i++) {
      ch = gameMap[i][col];
      for (var j = i; j < gameMap.length; j++) {
        if (gameMap[j][col] == ch && gameMap[j][col] != "") {
          col--;
          count++;
        } else {
          ch = gameMap[j][col];
          col--;
          count = 1;
        }
        if (count == 3) {
          this.block(turn, btns);
          return;
        }
      }
      count = 0;
      col = gameMap[0].length-1;
    }
  }

  block = (turn, btns) => {
    alert("win" + ' ' + turn);
    for (var i = 0; i < btns.length; i++) {
      btns[i].disabled = true;
    }
  }

  changeMode = (event) => {
    this.setState({mode: event.target.name});
  }

  render() {
    const mode = this.state.mode;
    if (mode == 0) {
      return (<div>
        <Input type="button" className="" name="1" onClick={this.changeMode} value="3x3"/>
        <Input type="button" className="" name="2" onClick={this.changeMode} value="4x4"/>
        <Input type="button" className="" name="3" onClick={this.changeMode} value="5x5"/>
      </div>);
    } else if (mode == 1) {
      return (<TicTacToe3x3 block={this.block} changeMode={this.changeMode} someoneWin={this.someoneWin}/>);
    } else if (mode == 2) {
      return (<TicTacToe4x4 block={this.block} changeMode={this.changeMode} someoneWin={this.someoneWin}/>);
    } else if (mode == 3) {
      return (<TicTacToe5x5 block={this.block} changeMode={this.changeMode} someoneWin={this.someoneWin}/>);
    }
  }
}

ReactDOM.render(<TicTacToe/>, document.getElementById('root'));
