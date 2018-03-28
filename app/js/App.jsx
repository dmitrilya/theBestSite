import React, { Component } from "react";
import LogIn from "./LogIn/LogIn";
import Main from "./Main/Main";


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      mode: false
    }
  }

  changeMode = () => {
    this.setState({
      mode: !this.state.mode
    });
  }

  render() {
    if (this.state.mode) return(<LogIn changeMode={this.changeMode}/>);
    return(<Main />);
  }
}
