// function closure() {
//   let counter = 0; // => Declared in function scope along with the function below
//   return function() {
//     return counter += 1; // => access variable in outer scope
//   };
// }

// let incrementer = closure(); // => invocation returns a function with private variable counter
// let anotherIncrementer = closure(); // => invocation returns a function with its own variable counter

// console.log(incrementer()); // => 1
// console.log(incrementer()); // => 2
// console.log(incrementer()); // => 3
// console.log(anotherIncrementer()); // => 1
// console.log(anotherIncrementer()); // => 2
// console.log(anotherIncrementer()); // => 3

function makeAdder(firstNumber) {
  return function(secondNumber) {
    return firstNumber + secondNumber;
  };
}

let addFive = makeAdder(5);
let addTen = makeAdder(10);

console.log(addFive(3));  // 8
console.log(addFive(55)); // 60
console.log(addTen(3));   // 13
console.log(addTen(55));  // 65