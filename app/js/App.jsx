import React, {Component} from 'react';
import Registration from './Components/Registration';
import SignIn from './Components/SignIn';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      mode: true
    }
  }

  changeMode = () => {
    this.setState({mode: !this.state.mode});
  }

  handleButton = (email, password) => {
    this.setState({users: this.state.users.concat({email: email, password: password})},
                                                  () => {console.log (this.state.users)});
    setTimeout(() => {this.changeMode()}, 4);
  }

  mayLogin = (loginEmail, loginPassword) => {
    var ifUser = false;
    for (var i = 0; i < this.state.users.length; i++) {
      if (this.state.users[i].email==loginEmail && this.state.users[i].password==loginPassword) {
        alert("вы вошли");
        ifUser = true;
        return;
      }
    }
    if (!ifUser) alert('Error');
  }

  render() {
    const mode = this.state.mode;
    if (mode == true) {
      return (<SignIn changeMode={this.changeMode} login={this.mayLogin}/>);
    }
    return (<Registration handleButton={this.handleButton}/>);
  }
}
