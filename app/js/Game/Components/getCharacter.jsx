export default function changeCharacteristics(room, changeMode, dialog, addToInventory, findedItems, openDoor) {
  let character ={};
  if (room === 0) { //PrisonStart
    character.startX = 1;
    character.startY = window.innerHeight/2+170;
    character.minX = 0;
    character.minY = window.innerHeight/2+55;
    character.maxX = window.innerWidth - 100;
    character.maxY = window.innerHeight - 165;
    character.goTo = (x, y) => {
      if (x < character.minX) {
        changeMode("1");
      }
    };
    character.interraction = (x, y) => {
      if (x > 28 && x < 117 && y < 470) {
        dialog(0);
      } else if (x > 690 && x < 770 && y >425 && y < 485 && !findedItems.key1) {
        addToInventory(0);
      } else if (x > 770 && x < 850 && y >425 && y < 485 && !findedItems.key2) {
        addToInventory(1);
      } else if (x > 1314 && x < 1429 && y < 440) {
        openDoor(0);
      }
    };
  } else if (room === 1) { //Gym
    character.startX = window.innerWidth - 100;
    character.startY = window.innerHeight/2+170;
    character.minX = 0;
    character.minY = window.innerHeight/2 + 35;
    character.maxX = window.innerWidth - 99;
    character.maxY = window.innerHeight - 165;
    character.goTo = (x, y) => {
      if (x > character.maxX) {
        changeMode("0");
      }
    };
    character.interraction = (x, y) => {};
  }
  return character;
}
