import React, {Component} from 'react';
import Input from './../Components/Input';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  changeData = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  changeShadow = (event) => {
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
  }

  changeMode = (event) => {
    this.changeShadow(event);
    setTimeout(() => {this.props.changeMode()}, 500);
  }

  login = (event) => {
    this.changeShadow(event);
    const {email, password} = this.state;
    setTimeout(() => {this.props.login(email, password)}, 500);
  }

  render() {
    return (<div className="logInSignInWindow">
      <Input className="logInTextBox" type="email" onChange={this.changeData} name="email" placeholder="E-mail"/>
      <Input className="logInTextBox" type="password" onChange={this.changeData} name="password" placeholder="Password"/>
      <div className="logInBtns">
        <Input className="logInBtn" id="btn" type="button" onClick={this.login} value="SignIn"/>
        <Input className="logInBtn" type="button" onClick={this.changeMode} value="SignUp"/>
      </div>
    </div>);
  }
}
