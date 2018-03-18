import React, {Component} from 'react';
import Input from './Components/Input';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      email: '',
      password: ''
    };
  }

  changeEmail = (event) => {
    this.setState({email: event.target.value.substr(0, 140)});
    console.log (this.state.email);
  }

  changePassword = (event) => {
    this.setState({password: event.target.value.substr(0, 140)});
  }

  handleButton = (event) => {
    this.setState({users: this.state.users.concat({email: this.state.email, password: this.state.password})});
    console.log (this.state.users);
  }

  render() {
    return (<div>
      <Input type="text" name="firstName" placeholder="Имя"/>
      <Input type="text" name="lastName" placeholder="Фамилия"/>
      <input type="email" onChange={this.changeEmail} name="email" placeholder="E-mail"/>
      <input type="password" onChange={this.changePassword} name="password" placeholder="Password"/>
      <div>
        <input type="button" onClick={this.handleButton} value="Зарегистрировать"/>
      </div>
    </div>)
  }
}
