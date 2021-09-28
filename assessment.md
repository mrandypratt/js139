# `var`
## REPL Behavior
In REPL, `var` creates varibles on global variable, when defined outside function scope.
```javascript
var bar = 42;
console.log(global.bar); // 42
let foo = 86;
console.log(global.foo); // undefined
```
NOTE: This works in the REPL, but not in a ".js" file. This is due to a function wrapper in which Node executes code. In other words, the code is run in a function-scope, not the global scope.
## Function-scope vs Block-scope
Variable namespace is reserved at the top of the function or block in which it is declared. Whether function or blocked depends on the declaration keyword.
### Function-scope:
Variables declared with `var`/`function` are accessible from anywhere inside the function where it is declared, even if it was declared in a block which is never executed.
### Block-scope:
Variables declared with `let`/`const`/`class`.

# Scope
## Declared Scope
How an identifier is declared (`let`/`const`/`class` for block scope, `var`/`function` for function scope).
```javascript
let foo1 = 1;        // declared scope is block scope
var bar1 = 2;        // declared scope is function scope

if (true) {
  let foo2 = 3;      // declared scope is block scope
  var bar2 = 4;      // declared scope is function scope
}

function xyzzy() {  // declared scope is function scope
  let foo3 = 5;     // declared scope is block scope
  var bar3 = 6;     // declared scope is function scope

  if (true) {
    let foo4 = 7;   // declared scope is block scope
    var bar4 = 8;   // declared scope is function scope
  }
}
```
## Visibility Scope
Where an identifier is available for use. Is either global, local-block, or local-function scope based on declared scope and position relative to blocks and functions.
```javascript
let foo1 = 1;        // visibility scope is global
var bar1 = 2;        // visibility scope is global

if (true) {
  let foo2 = 3;      // visibility scope is local (local block)
  var bar2 = 4;      // visibility scope is global
}

function xyzzy() {  // visibility scope is global
  let foo3 = 5;     // visibility scope is local (local function)
  var bar3 = 6;     // visibility scope is local (local function)

  if (true) {
    let foo4 = 7;   // visibility scope is local (local block)
    var bar4 = 8;   // visibility scope is local (local function)
  }
}
```
## Lexical Scope
Variable accessibility or whether a variable is in the inner or outer scope relative to another location at any point in the program. 
Important note:`var`/`function` is always considered outer scope of a block statement.
```javascript
// Block-Scoped examples
let foo1 = 1;     // outer scope of xyzzy, outer scope of if block on line 3

if (true) {
  let foo2 = 3;   // inner scope of if block on line 3
}

function xyzzy() {
  let foo3 = 5;   // inner scope of xyzzy, outer scope of if block on line 10

  if (true) {
    let foo4 = 7; // inner scope of if block on line 10
  }
}

// Function Scoped Examples
var bar1 = 1;     // outer scope of xyzzy, outer scope of if block on line 3

if (true) {
  var bar2 = 3;   // outer scope of xyzzy, outer scope of if block on line 3
}

function xyzzy() {
  var bar3 = 5;   // inner scope of xyzzy, outer scope of if block on line 10

  if (true) {
    var bar4 = 7; // inner scope of xyzzy, outer scope of if block on line 10
  }
}
```

# Hoisting
A mental framework which explains how declarations are handled during the **creation phase** of a program and causes otherwise unexpected variable behavior in the **execution phase**
Hoisting is the process of making each variable available a the top of their respective scope (function or block).
## Differences by keyword
`var`: Initialized to `undefined`
`let`/`const`/`class`: Namespace is reserved without an initial value (throws `ReferenceError`). Called the TDZ (Temporal Dead Zone)
`function`: hoist entire body and declaration so it can be invoked successfully prior to declaration.
function expression: same as the varaible keyword used to declared

NOTE: `var` and `function` can exhibit strange behavior depending on the order in which the values are declared and accessed/invoked when they share the same name.`function` gets hoisted and `var` can reassign the function variable.

### Best Practices
- Declare `var` variables at top of scope
- Declare `let`/`const` as close to first usage
- Declare `function` before referencing/calling

# Strict mode
The inclusion of the **pragma** `"use strict";` at the top of a file or function definition (must be the very top)
Strict Mode is used implicitly wihin a `class` or module body.
Lexically scoped, so you may use strict mode at the beginning of a function scope in a program which is not in strict mode.
What Strict Mode does:
- Implicit Execution for invocations to `undefined` instead of `global`.
- Does not allow Octal literals (numbers with leading zeros & numbers only between 0-7)
- Prevents declaring two function parameters with same name
- Prevents using `let` and `static` as variable names.

# Closures
The packaging of pointers to lexically in-scope variables along with a function when assigning a function as a variable.
In order to make use of Closures, you create a function which does the following:
1. Defines private data in the top of the function scope
2. Returns another function or object which interacts with the private data within the closure.
```javascript
function closure() {
  let counter = 0; // => Declared in function scope along with the function below
  return function() {
    return counter += 1; // => access variable in outer scope
  };
}

let incrementer = closure(); // => invocation returns a function with private variable counter
let anotherIncrementer = closure(); // => invocation returns a function with its own variable counter

console.log(incrementer()); // => 1
console.log(incrementer()); // => 2
console.log(incrementer()); // => 3
console.log(anotherIncrementer()); // => 1
console.log(anotherIncrementer()); // => 2
console.log(anotherIncrementer()); // => 3
```
When the returned function or object is assigned to a variable in another scope, the closure will ensure that the private data that was in the function scope which returned the object/function remains in scope whenever accessing that object or invoking the function or method which references it.

## Private Data
Closures allow a function to access variables which pull from the outer scope of the function declaration. This means at the point of invocation, the variable being accessed may be out of scope.  This allows us to package functions with varaibles which are private to the function only.

## Partial function application
When defining a closure, the outer function accepts one or more but not all of the parameters needed by the function returned in the closure.
```javascript
function makeAdder(firstNumber) {
  return function(secondNumber) {
    return firstNumber + secondNumber;
  };
}

let addFive = makeAdder(5); // => five is stored as firstNumber in the closure
let addTen = makeAdder(10); // => ten is store das firstNumber in the closure

console.log(addFive(3));  // 8
console.log(addFive(55)); // 60
console.log(addTen(3));   // 13
console.log(addTen(55));  // 65
```

# IIFEs
Immediately Invoked Function Expressions are defined and invoked simultaneously using the following syntax:
```javascript
(function() {
  console.log('hello');
})();                     // => hello

((first, second) => first * second)(5, 6); // => 30
```
The function scope creates a private lexical namespace which can avoid unintentionally altering a previously declared variable. This applies to variables within the function as well as the function name itself. 
Blocks can accomplish a similar effect
```javascript
let arr = [1, 2, 3]
{
  let arr = [1, 2, 3];
  arr.pop();
  console.log(arr); // => [1, 2]
}
console.log(arr); // => [1, 2, 3]
```
Saving IIFEs to variables can be very convenient also, per the following example:
```javascript
const makeUniqueId = (function() {
  let count = 0;
  return function() {
    ++count;
    return count;
  };
})();

makeUniqueId(); // => 1
makeUniqueId(); // => 2
makeUniqueId(); // => 3
```
In this example, an IIFE creates a closure with a counter and stores a function which increments and returns the counter into a variable.  This means the id can be generated directly from calling the returned closure stored in makeUniqueId.

# Shorthand notation (understanding, not using)
## Destructuring 1: Objects
```javascript
// Given obj
let obj = {
  prop1: 1,
  prop2: 2,
  prop3: 3,
};

// This can be shortened...
let prop1 = obj.prop1;
let prop2 = obj.prop2;
let prop3 = obj.prop3;

// ...into this!
let { prop1, prop2, prop3 } = obj;

// Or this!
let { prop1: var1, prop2: var2, prop3: var3 } = obj;
// => var1 = 1, var2 = 2, var3 = 3
```
## Destructuring 2: Function Parameters
```javascript
function xyzzy({ prop1, prop2, prop3 }) {
  console.log(prop1); // 3
  console.log(prop2); // 2
  console.log(prop3); // 1
}

let obj = {
  prop1: 1,
  prop2: 2,
  prop3: 3,
};

xyzzy(obj);
```
Note: Names of Parameters must match name of property keys

## Destructuring 3: Arrays
```javascript
// Arrays are put in variables by index order
let foo = [1, 2, 3];
let [ first, second, third ] = foo;
```
## Spread Syntax
Use of `...arr` to separate array or object properties into separate items

### Application 1: Pass Array Elements as Arguments
```javascript
let arr = [1, 2, 3];
function logNums(n1, n2, n3) {
  console.log(n1)
  console.log(n2)
  console.log(n3)
}

logNums(...arr); // => logs 1 2 3
```
### Application 2: Clone & Concatenate Arrays & Objects
Array:
```javascript
let arr = [1, 2, 3];
let arrClone = [...arr]; // => [1, 2, 3]
console.log(arr === arrClone); // => false

let combinedArr = [...arr, ...arrClone]; // => [1, 2, 3, 1, 2, 3]
```
Object:
```javascript
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
```
## Rest Operator
Takes remaining elements of an array or object an stores in a new array/object. Great for undetermined length arrays or objects.
```javascript
function maxItem(first, ...moreArgs) {
  let maximum = first;
  moreArgs.forEach(value => {
    if (value > maximum) {
      maximum = value;
    }
  });

  return maximum;
}

console.log(maxItem(2, 6, 10, 4, -3));
```

# Modules (CommonJS)
1. CommonJS/Node Modules:
- Taught in Launch School
- Synchronous: not compatible with browser
- iginally included in Node
2. JS Modules/ES Modules/ECMAScript Modules
- Useful in Browser

## CommonJS Modules
In order to share variables across files, you must export using `module.exports` for each export, then use `require('./path')` to import.
```javascript
// in logit.js
function logIt(string) {
  console.log(string);
}

module.exports = logIt
```
```javascript
// in main.js
let logIt = require("./logit");
logIt("Works!"); // => Works!
```
### Path references
1. NPM Module: use package name in quotes as path
2. Local File System: use './' in path to indicate relative path

### Destructuring with modules:
```javascript
// in logit.js
let prefix = ">> ";

function logIt(string) {
  console.log(`${prefix}${string}`);
}

function setPrefix(newPrefix) {
  prefix = newPrefix;
}

module.exports = {
  logIt,
  setPrefix,
};
```
```javascript
// in main.js
const { logIt, setPrefix } = require("./logit");
logIt("You rock!"); // >> You rock!
setPrefix("++ ");
logIt("You rock!"); // ++ You rock!
```

# Exceptions
Throw an Error/Raise an Exception
Exception Handler: `try`/`catch` statements, where the `try` block runs the code and the `catch` block does something in response.
`Error` is a type from which `ReferenceError`, `TypeError`, and `SyntaxError` inherit.
## Throwing Error
There are a few ways the `throw` keyword can assist in stopping the program for unforseen errors.
### `throw`
By itself, `throw` merely stops the program immediately and prints the location of the `throw` statement.
```javascript
let arr = [1, 2, 3];

arr.forEach(elem => {
  if (elem === 2) {
    throw "Illegal number 2";
  }
  
  console.log(elem);
});

// Output
// 1

// /home/ec2-user/environment/js139/practice/throw.js:5
//     throw "Illegal number 2";
//     ^
// Illegal number 2
// (Use `node --trace-uncaught ...` to show where the exception was thrown)
```
### `throw new Error("ErrorType")`
Full Stack Trace is pulled in and error gives better discription
```javascript
let arr = [1, 2, 3];

arr.forEach(elem => {
  if (elem === 2) {
    throw new Error("Illegal number 2");
  }
  
  console.log(elem);
});

// Output
// 1
// /home/ec2-user/environment/js139/practice/throw.js:5
//     throw new Error("Illegal number 2");
//     ^

// Error: Illegal number 2
//     at /home/ec2-user/environment/js139/practice/throw.js:5:11
//     at Array.forEach (<anonymous>)
//     at Object.<anonymous> (/home/ec2-user/environment/js139/practice/throw.js:3:5)
//     at Module._compile (node:internal/modules/cjs/loader:1092:14)
//     at Object.Module._extensions..js (node:internal/modules/cjs/loader:1121:10)
//     at Module.load (node:internal/modules/cjs/loader:972:32)
//     at Function.Module._load (node:internal/modules/cjs/loader:813:14)
//     at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:76:12)
//     at node:internal/main/run_main_module:17:47
```
### Custom Error Types
Using the syntax below, you can create custom types of Error
```javascript
class MyCustomError extends Error{}

if (true) {
  throw new MyCustomError("Specific Situation");
}
```
## `try`/`catch`
A `try` block contains code which may be erroneous, and the `catch` block allows alternative code to be run in the case of an error, and finally an error is thrown for any anomoly.

# Pure functions and side effects

## Side Effects
Any function which:
1. reassigns any non-local variable or object which references a non-local variable.
  - Reassignment of variable in outer scope.
  - Mutation of an object/array/class which may be in the outer scope or passed in as argument.
2. reads from or writes to any data entity that is non-local to your program.
  - Reading/Writing to/from another file, Databases, webpage, ect
  - Reading Keyboard input
  - Writing to console/Updating display
  - Accessing hardware features (input devices, clock/calendar, camera, audio, `Math.random()`)
3. raises an exception, if it both...
  - does not catch and handle the exception
  - has side effects in the `catch` block
4. calls another function that has any side effects that are not confined to the current function.

## Pure Function
1. Has no side Effects
2. Will always have the same return value given the same set of arguments

# Testing with Jest
## Jest
## Testing terminology
## Writing tests
## expect and matchers (toBe and toEqual especially)
## SEAT approach
## Understanding code coverage

# Packaging
## Project directory layout
## npm and npx
## package.json and package-lock.json
## what is transpilation
## npm scripts
## packaging projects

# Asynchronous programming
## `setTimeout`
## `setInterval`
## Event Loop

Regex Review https://launchschool.com/books/regex

Set up Practice Code Environment with ESLint