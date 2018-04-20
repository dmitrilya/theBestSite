export default function getPet(nextRoom, lastRoom, changeMode, addToInventory, findedItems) {
  let pet ={};
  if (nextRoom === 0) { //PrisonStart
    pet.startX = 1;
    pet.startY = window.innerHeight/2+170;
    pet.minX = 0;
    pet.minY = window.innerHeight/2 + 140;
    pet.maxX = window.innerWidth - 110;
    pet.maxY = window.innerHeight - 90;
    pet.goTo = (x, y) => {
      if (x < pet.minX) {
        changeMode("1");
      }
    };
    pet.interraction = (x, y) => {
      if (x > 640 && x < 720 && y >520 && y < 580 && !findedItems.key1) {
        addToInventory(0);
      } else if (x > 720 && x < 800 && y >520 && y < 580 && !findedItems.key2) {
        addToInventory(1);
      }
    };
  } else if (nextRoom === 1) { //Gym
      pet.startX = (lastRoom===0) ? window.innerWidth - 100 : 1;
      pet.startY = window.innerHeight/2+170;
      pet.minX = 0;
      pet.minY = window.innerHeight/2 + 120;
      pet.maxX = window.innerWidth - 99;
      pet.maxY = window.innerHeight - 90;
      pet.goTo = (x, y) => {
        if (x > pet.maxX) {
          changeMode("0");
        } else if (x < pet.minX) {
          changeMode("2");
        }
      };
      pet.interraction = (x, y) => {};
  } else if (nextRoom === 2) { //Gym2
      pet.startX = window.innerWidth - 100;
      pet.startY = window.innerHeight/2+170;
      pet.minX = 0;
      pet.minY = window.innerHeight/2 + 120;
      pet.maxX = window.innerWidth - 99;
      pet.maxY = window.innerHeight - 90;
      pet.goTo = (x, y) => {
        if (x > pet.maxX) {
          changeMode("1");
        }
      };
      pet.interraction = (x, y) => {};
    }
  return pet;
}
