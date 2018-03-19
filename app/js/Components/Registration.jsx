import React, {Component} from 'react';
import Input from './Input';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  changeEmail = (event) => {
    this.setState({email: event.target.value.substr(0, 140)});
  }

  changePassword = (event) => {
    this.setState({password: event.target.value.substr(0, 140)});
  }

  sendUser = (event) => {
    var email = this.state.email;
    var password = this.state.password;
    this.props.handleButton(email, password);
  }

  render() {
    let email = this.state.email;
    let password = this.state.password;
    return (<div>
      <Input type="text" name="firstName" placeholder="Имя"/>
      <Input type="text" name="lastName" placeholder="Фамилия"/>
      <input type="email" onChange={this.changeEmail} name="email" placeholder="E-mail"/>
      <input type="password" onChange={this.changePassword} name="password" placeholder="Password"/>
      <div>
        <input type="button" onClick={this.sendUser}  value="Зарегистрировать"/>
      </div>
    </div>)

  }
}
