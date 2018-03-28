import React, {Component} from "react";
import Input from "./Input";

export default function Menu(props) {
  return(<div>
      <p>The Best Site</p>
      <Input type="button" name="1" value="BlackJack" onClick={props.changeMode}/>
      <Input type="button" name="2" value="Game" onClick={props.changeMode}/>
      <Input type="button" name="3" value="Pare" onClick={props.changeMode}/>
      <Input type="button" name="4" value="TicTacToe" onClick={props.changeMode}/>
    </div>);
}
