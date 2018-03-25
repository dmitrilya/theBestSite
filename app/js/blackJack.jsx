import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Input from './Components/Input';

class BlackJack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 11, 11, 11, 11],
      max: 36,
      sum: 0
    }
  }

  start = () => {
    let deck = this.state.deck;
    for (var i = 0; i < 2; i++) {
      var number = Math.floor(Math.random() * (this.state.max));
      this.setState({sum: this.state.sum + deck[number]}, () => {this.result.value = this.state.sum});
      deck.splice(number, 1);
      this.setState({max: this.state.max--});
      setTimeout(() => {console.log(this.state.sum);console.log(deck)},4);
    }
  }

  take = (event) => {
    let deck = this.state.deck;
    var number = Math.floor(Math.random() * (this.state.max));
    this.setState({sum: this.state.sum + deck[number]}, () => {this.result.value = this.state.sum});
    deck.splice(number, 1);
    this.setState({max: this.state.max--});
    console.log(deck);
    setTimeout(() => {if (this.state.sum>21) {
      alert("lose");
      event.target.disabled = true;
      this.pas.disabled = true;
    }},4);
  }

  end = () => {
    alert('win');
  }

  render() {
    return(<div>
      <Input type="button" onClick={this.end} name="pas" value="Пас" inputRef={(label) => {this.pas = label}}/>
      <Input type="button" onClick={this.take} name="more" value="Еще"/>
      <Input type="button" onClick={this.start} name="start" value="Начать игру"/>
      <Input type="textBox" name="result" inputRef={(label) => {this.result = label}}/>
    </div>)
  }
}

ReactDOM.render(<BlackJack/>, document.getElementById('root'));
