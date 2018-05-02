function getPet(nextRoom, lastRoom, changeMode, addToInventory, findedItems, height) {
  let pet ={};
  if (nextRoom === 0) { //PrisonStart
    pet.startX = 0;
    console.log(height);
    pet.startY = window.innerHeight/4*3-height;
    pet.goTo = (x, y) => {
      if (x < 1) {
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
      pet.goTo = (x, y) => {
        if (x > window.innerWidth - 99) {
          changeMode("0");
        } else if (x < 1) {
          changeMode("2");
        }
      };
      pet.interraction = (x, y) => {};
  } else if (nextRoom === 2) { //Gym2
      pet.startX = window.innerWidth - 100;
      pet.startY = window.innerHeight/2+170;
      pet.goTo = (x, y) => {
        if (x > window.innerWidth - 99) {
          changeMode("1");
        }
      };
      pet.interraction = (x, y) => {};
    }
  return pet;
}

function availableArea(currentRoom, changeMode, addToInventory, findedItems, height, width) {
  let pet ={};
  if (currentRoom === 0) { //PrisonStart
    pet.minX = 0;
    pet.minY = window.innerHeight/2 + 70;
    pet.maxX = window.innerWidth - width;
    pet.maxY = window.innerHeight - 170;
  } else if (currentRoom === 1) { //Gym
      pet.minX = 0;
      pet.minY = window.innerHeight/2 + 120;
      pet.maxX = window.innerWidth - width;
      pet.maxY = window.innerHeight - 90;
  } else if (currentRoom === 2) { //Gym2
      pet.minX = 0;
      pet.minY = window.innerHeight/2 + 120;
      pet.maxX = window.innerWidth - width;
      pet.maxY = window.innerHeight - 90;
    }
  return pet;
}

export {getPet, availableArea};
