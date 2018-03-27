import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Input from './../Components/Input';

class Pare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winx: [[],[]]
    }
    this.count = 0;
    this.index = [];
    this.b;
  }

  handleButton = (event) => {
    let winx = this.state.winx;
    winx[0][event.target.name].style.background = winx[1][event.target.name];

    for (var i = 0; i < 6; i++) {
      this.b = false;
      if (winx[0][i].style.background != 'url("../src/img/bgSignIn.jpg")') {

        for (var j = 0; j < this.index.length; j++) {
          if(i == this.index[j]){
            this.b = true;
            break;
          }
        }
        if(this.b)
          continue;
        this.count++;
        this.index.push(i);
        console.log(this.index);
        if(this.count == 2){
          if(winx[0][this.index[this.index.length-2]].style.background != winx[0][this.index[this.index.length-1]].style.background){
            winx[0][this.index[this.index.length-2]].style.background = 'url("../src/img/bgSignIn.jpg")';
            winx[0][this.index[this.index.length-1]].style.background = 'url("../src/img/bgSignIn.jpg")';
            this.index.splice(-2, 2);
          }
          this.count = 0;
        }
      }
    }
  }

  componentDidMount() {
    this.img0.style.background = "url('../src/img/bgSignIn.jpg')";
    this.img1.style.background = "url('../src/img/bgSignIn.jpg')";
    this.img2.style.background = "url('../src/img/bgSignIn.jpg')";
    this.img3.style.background = "url('../src/img/bgSignIn.jpg')";
    this.img4.style.background = "url('../src/img/bgSignIn.jpg')";
    this.img5.style.background = "url('../src/img/bgSignIn.jpg')";
    let winx = this.state.winx;
    winx[0][0] = this.img0;
    winx[0][1] = this.img1;
    winx[0][2] = this.img2;
    winx[0][3] = this.img3;
    winx[0][4] = this.img4;
    winx[0][5] = this.img5;
    console.log(winx[0]);
    var winxCopy = [];
    winxCopy[0] = winx[0][0];
    winxCopy[1] = winx[0][1];
    winxCopy[2] = winx[0][2];
    winxCopy[3] = winx[0][3];
    winxCopy[4] = winx[0][4];
    winxCopy[5] = winx[0][5];
    var max = 6;
    var number;
    var ref;
    var urls = ["url('../src/img/pare1.jpg')", "url('../src/img/pare1.jpg')", "url('../src/img/pare2.jpg')", "url('../src/img/pare2.jpg')",
                "url('../src/img/pare3.jpg')", "url('../src/img/pare3.jpg')"];
    var j=0;
    while (winxCopy.length != 0) {

      number = Math.floor(Math.random() * (max));
      ref = winxCopy[number];
      for (var i = 0; i < 6; i++) {
        if (winx[0][i] == ref) {
           winx[1][i] = urls[j];
         }
      }
      max--;
      j++;
      winxCopy.splice(number, 1);
    }
    this.setState({winx: winx});
  }

  render() {
    return(
      <div className="window">
        <Input className="bigBtn" type="button" onClick={this.handleButton} name="0" inputRef={(input) => {this.img0 = input}}/>
        <Input className="bigBtn" type="button" onClick={this.handleButton} name="1" inputRef={(input) => {this.img1 = input}}/>
        <Input className="bigBtn" type="button" onClick={this.handleButton} name="2" inputRef={(input) => {this.img2 = input}}/>
        <Input className="bigBtn" type="button" onClick={this.handleButton} name="3" inputRef={(input) => {this.img3 = input}}/>
        <Input className="bigBtn" type="button" onClick={this.handleButton} name="4" inputRef={(input) => {this.img4 = input}}/>
        <Input className="bigBtn" type="button" onClick={this.handleButton} name="5" inputRef={(input) => {this.img5 = input}}/>
      </div>
    )
  }
}

ReactDOM.render(<Pare/>, document.getElementById('root'));
