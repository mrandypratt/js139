function bind(thisArg, functArg) {
  return function() {
    return functArg.apply(thisArg, arguments);
  };
}

let myObj = {
  number: 1,
  logNum() {
    console.log(this.number);
  },
  
  increment() {
    this.number += 1;
  }
};

myObj.logNum();
let increment = myObj.increment;
let myObjIncrementer = bind(myObj, increment);

myObjIncrementer();
myObj.logNum();
