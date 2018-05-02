export default function changeWay(event) {
    let anim = this.state.animation;
    if (!this.keyDown) {
      if (event.keyCode == 40) { //вниз
        if (anim == "stayRight") {
          this.setState({ animation: "walkingRight" });
        } else if (anim == "stayLeft") {
          this.setState({ animation: "walkingLeft" });
        }
      } else if (event.keyCode == 39) { //вправо
        this.setState({ animation: "walkingRight" });
      } else if (event.keyCode == 38) { //вверх
        if (anim == "stayRight") {
          this.setState({ animation: "walkingRight" });
        } else if (anim == "stayLeft") {
          this.setState({ animation: "walkingLeft" });
        }
      } else if (event.keyCode == 37) { //влево
        this.setState({ animation: "walkingLeft" });
      } else if (event.key == "e" || event.key == "у" || event.key == "E" || event.key == "У") {
        this.interraction(this.x, this.y); //взаимодействие
        if (this._reactInternalFiber.type.name === "Character" && this.canMount) this.mount();
      }
      this.idTimer = setInterval(() => {//**********************************
        this.update(event.keyCode);                  //создание запросов на перемещение**
        //if (this._reactInternalFiber.type.name === "Character" && this.speed !== 9)	this.props.mountUpdate(event.keyCode);
      }, 60);														//**********************************
      this.keyDown = true; //больше не реагировать
    }
};
