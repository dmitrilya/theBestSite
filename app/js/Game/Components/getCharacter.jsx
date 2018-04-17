export default function changeCharacteristics(room, changeMode, dialog, addToInventory, findedItems) {
  let character ={};
  if (room === 0) {
    character.startX = 1;
    character.startY = 350;
    character.minX = 0;
    character.minY = 280;
    character.maxX = 1155;
    character.maxY = window.innerHeight - 380;
    character.goTo = (x, y) => {
      if (x < 0) {
        changeMode("1");
      }
    };
    character.interraction = (x, y) => {
      if (x > 28 && x < 117 && y < 310) {
        dialog(0);
      } else if (x > 490 && x < 570 && y < 350 && !findedItems.key1) {
        addToInventory(0);
      }
    };
  } else if (room === 1) {
    character.startX = 1150;
    character.startY = 350;
    character.minX = 0;
    character.minY = 255;
    character.maxX = 1155;
    character.maxY = window.innerHeight - 360;
    character.goTo = (x, y) => {
      if (x > 1150) {
        changeMode("0");
      }
    };
    character.interraction = (x, y) => {};
  }
  return character;
}
