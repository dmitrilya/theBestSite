import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Registration from './Registration';
import SignIn from './SignIn';

class LogIn extends Component {
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
    }, () => {
      console.log(this.state.users)
    });
    setTimeout(() => {
      this.changeMode()
    }, 4);
  }

  mayLogin = (loginEmail, loginPassword) => {
    for (var i = 0; i < this.state.users.length; i++) {
      if (this.state.users[i].email == loginEmail && this.state.users[i].password == loginPassword) {
        alert("Welcome " + this.state.users[i].firstName + ' ' + this.state.users[i].lastName + '!');
        location.href = "html/main.html";
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
        <audio src="src/mp3/logInSound.mp3" autoplay="autoplay"/>
      </div>);
    }
    return (<div>
      <Registration createUser={this.createUser}/>
      <audio src="src/mp3/logInSound.mp3" autoplay="autoplay"/>
    </div>);
  }
}

ReactDOM.render(<LogIn/>, document.getElementById('root'));
