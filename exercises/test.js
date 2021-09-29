let { log } = require("./log");

// Closure with Object
let item = (name) => {
  let itemName = name;
  
  return {
    name() {
      return itemName;
    },
    
    updateName(newName) {
      itemName = newName;
      return itemName;
    }
  };
};

let item1 = item("Harold")
let item2 = item("Kumar")

log(item1);
log(item1.name());
log(item2);
log(item2.name());


// IIFE

// Closure in IIFE

// return IIFE containing Closure

