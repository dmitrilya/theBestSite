import React, {Component} from 'react';
import Input from './Input';

export default class SignIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  changeEmail = (event) => {
    this.setState({email: event.target.value.substr(0, 140)});
  }

  changePassword = (event) => {
    this.setState({password: event.target.value.substr(0, 140)});
  }

  login = () => {
    var email = this.state.email;
    var password = this.state.password;
    this.props.login(email, password);
  }

  render() {
    return (<div>
      <input type="email" onChange={this.changeEmail} name="email" placeholder="E-mail"/>
      <input type="password" onChange={this.changePassword} name="password" placeholder="Password"/>
      <input type="button" onClick={this.login} value="SignIn"/>
      <input type="button" onClick={this.props.changeMode} value="SignUp"/>
    </div>);
  }
}
