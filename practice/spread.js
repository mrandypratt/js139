let arr = [1, 2, 3];
let arrClone = [...arr]; // => [1, 2, 3]
console.log(arr === arrClone); // => false

let combinedArr = [...arr, ...arrClone]; // => [1, 2, 3, 1, 2, 3]

let obj = {
  prop1: 1,
  prop2: 2,
};

let otherObj = {
  prop3: 3,
  prop4: 4,
};

let objClone = {...obj}; // => { prop1: 1, prop2: 2 }
console.log(obj === objClone); // => false

let combinedObj = {...obj, ...otherObj}; // => { prop1: 1, prop2: 2, prop3: 3, prop4: 4 }
