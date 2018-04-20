export default function changeWay(event) {
    let anim = this.state.animation;
    if (!this.keyDown) {
      if (event.keyCode == 40) { //вниз
        this.fastMove ? this.setState({ speedX: 0, speedY: 70 }) : this.setState({ speedX: 0, speedY: 9 });	//под шифтом?
        if (anim == "stayRight") {
          this.setState({ animation: "walkingRight" });
        } else if (anim == "stayLeft") {
          this.setState({ animation: "walkingLeft" });
        }
      } else if (event.keyCode == 39) { //вправо
        this.fastMove ? this.setState({ speedX: 70, speedY: 0, animation: "walkingRight" }) :	//под шифтом?
                        this.setState({ speedX: 9, speedY: 0, animation: "walkingRight" });
      } else if (event.keyCode == 38) { //вверх
        this.fastMove ? this.setState({ speedX: 0, speedY: -70 }) : this.setState({ speedX: 0, speedY: -9 });	//под шифтом?
        if (anim == "stayRight") {
          this.setState({ animation: "walkingRight" });
        } else if (anim == "stayLeft") {
          this.setState({ animation: "walkingLeft" });
        }
      } else if (event.keyCode == 37) { //влево
        this.fastMove ? this.setState({ speedX: -70, speedY: 0, animation: "walkingLeft" }) :	//под шифтом?
                        this.setState({ speedX: -9, speedY: 0, animation: "walkingLeft" });
      } else if (event.key == "e" || event.key == "у" || event.key == "E" || event.key == "У") {
        this.interraction(this.x, this.y); //взаимодействие
      } else if (event.keyCode == 20) {
        this.fastMove = !this.fastMove;
      }
      this.idTimer = setInterval(() => {//**********************************
        this.update();									//создание запросов на перемещение**
      }, 60);														//**********************************
      this.keyDown = true; //больше не реагировать
    }
};
