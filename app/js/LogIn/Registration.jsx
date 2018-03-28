import React, {Component} from 'react';
import Input from './../Components/Input';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
  }

  changeData = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  sendUser = () => {
    var elem = event.target,
        x = -2,
        y = 2,
        blurring = 36,
        valueXY = -2,
        valueBlurring = -36,
        inset = '',
        porog = false;
    shadow();
    function shadow() {
      if (x > -2.9) {
        if (x > -0.1) {
          porog = true;
          inset = 'inset ';
        }
        x = -Math.abs(valueXY);
        y = Math.abs(valueXY);
        blurring = Math.abs(valueBlurring);
        elem.style.boxShadow = inset + x + 'px ' + y + 'px ' + blurring + 'px';
        valueXY = valueXY+0.2;
        if (!porog) {
          valueBlurring = valueBlurring+3.6;
        }
        else {
          valueBlurring = valueBlurring+1.867;
        }
        setTimeout(shadow, 25)
      }
    }
    const {firstName, lastName, email, password} = this.state;
    setTimeout(() => {if (firstName != '' && lastName != '' && email != '' && password != '') {
      this.props.createUser(firstName, lastName, email, password);
    } else {
      alert('Не все поля заполнены!')
    }}, 500);
  }

  render() {
    const {email, password} = this.state;
    return (<div className="logInSignInWindow">
      <Input type="text" className="logInTextBox" onChange={this.changeData} name="firstName" placeholder="Имя"/>
      <Input type="text" className="logInTextBox" onChange={this.changeData} name="lastName" placeholder="Фамилия"/>
      <Input type="email" className="logInTextBox" onChange={this.changeData} name="email" placeholder="E-mail"/>
      <Input type="password" className="logInTextBox" onChange={this.changeData} name="password" placeholder="Password"/>
      <Input type="button" className="logInBtn logInSignUp" onClick={this.sendUser} value="Create new account"/>
    </div>)

  }
}
