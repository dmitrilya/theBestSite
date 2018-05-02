import React, {Component} from 'react';
import Registration from './Registration';
import SignIn from './SignIn';

export default class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        {
          firstName: 'Илья',
          lastName: 'Дмитриев',
          email: 1,
          password: 1
        }, {
          firstName: 'Никита',
          lastName: 'Литвин',
          email: 2,
          password: 2
        }, {
          firstName: 'Дима',
          lastName: 'Кононенко',
          email: 3,
          password: 3
        }, {
          firstName: 'Захар',
          lastName: 'Неумывакин',
          email: 4,
          password: 4
        }, {
          firstName: 'Роман',
          lastName: 'Крюков',
          email: 5,
          password: 5
        }
      ],
      mode: true
    }
  }

  changeMode = () => {
    this.setState({
      mode: !this.state.mode
    });
  }

  createUser = (firstName, lastName, email, password) => {
    this.setState({
      users: this.state.users.concat({firstName: firstName, lastName: lastName, email: email, password: password})
    });
    setTimeout(() => {
      this.changeMode()
    }, 4);
  }

  mayLogin = (loginEmail, loginPassword) => {
    for (var i = 0; i < this.state.users.length; i++) {
      if (this.state.users[i].email == loginEmail && this.state.users[i].password == loginPassword) {
        alert("Welcome " + this.state.users[i].firstName + ' ' + this.state.users[i].lastName + '!');
        this.props.changeMode();
        return;
      }
    }
    alert('Uncorrect login or password');
  }

  render() {
    const {mode} = this.state;
    if (mode == true) {
      return (<div>
        <SignIn changeMode={this.changeMode} login={this.mayLogin}/>
      </div>);
    }
    return (<div>
      <Registration createUser={this.createUser}/>
    </div>);
  }
}
