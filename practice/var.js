console.log(letvar); // => ReferenceError: Cannot access 'letvar' before initialization
console.log(constvar); // => ReferenceError: Cannot access 'constvar' before initialization
console.log(functionvar); // => [Function: functionvar]
console.log(functionvar()); // => Hello
console.log(varvar); // => undefined
console.log(Classvar); // => ReferenceError: Cannot access 'Classvar' before initialization
let classvar = new Classvar(); // => ReferenceError: Cannot access 'Classvar' before initialization


let letvar = "Hello";
const constvar = "Hello";
function functionvar() { return "Hello"}
var varvar = "Hello";
class Classvar {
  constructor() {
    console.log("Hello")
  }
}