export default function getCharacter(nextRoom, lastRoom, changeMode, dialog, addToInventory, findedItems, openDoor) {
  let character ={};
  if (nextRoom === 0) { //PrisonStart
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
      } else if (x > 680 && x < 760 && y >425 && y < 485 && !findedItems.key1) {
        addToInventory(0);
      } else if (x > 760 && x < 840 && y >425 && y < 485 && !findedItems.key2) {
        addToInventory(1);
      } else if (x > 1314 && x < 1429 && y < 440) {
        openDoor(0);
      }
    };
  } else if (nextRoom === 1) { //Gym
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
