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

## Why Write Tests:
Prevents **regression** (aka breaking code which already worked)

## Jest
1. Install Jest:
Global
```
npm i -g jest
```
Dev Dependency
```
npm i -D jest
```
2. Create `jest.config.js`
No contents necessary, but must exist to run.
```
touch jest.config.js
```
3. Create test file(s)
`filename.test.js`
```javascript
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});
```
4. Run Test
`jest` or `jest filename.test.js`

## Testing terminology
### **Test Suite**
Entire set of tests for a project/program/application.
### **Test** (aka **Specs**)
Specific situation testing for made up of one or more assertions.
### **Assertion** (aka **Expectations**)
Verification step confirming the program did what it should.

## Writing tests
1. export the code you want to test using `module.exports =`
2. require the file to be tested in your `jest` test file
  - if the file being tested is `file.js`, the test file should be named `file.test.js`
  - 
3. Create tests to run on file
`file.test.js`
```javascript
const Car = require("./file");

describe("The Car class", () => { // Grouping of tests
  test("has four wheels", () => { // Test
    let car = new Car();
    expect(car.wheels).toBe(4); // Assertion (expect) & Matcher (toBe)
  });
});
```
Skipping Tests: replace `test` with `xtest` or append `.skip` after to skip a test.
## expect and matchers (toBe and toEqual especially)
| Matcher	| Description |
| toBe | Fails unless actual value === expected value |
| toEqual | Same as toBe but can also test for object equality, e.g., {a: 1} is equal to {a: 1} |
| toBeUndefined | Fails unless the actual value is undefined. Same as toBe(undefined) |
| toThrow | Fails unless the expression passed in to expect raises/throws an error |
| toBeNull | Fails unless the actual value is null. Same as toBe(null) |
| toBeTruthy | Fails unless the actual value is truthy |
| toContain | Fails unless the given array includes a value. Also finds substrings in strings. |

## SEAT approach
### **S**et up the neccessary objects
Rather than this...
```javascript
const Car = require('./car');

describe('The Car class', () => {
  test('has four wheels', () => {
    let car = new Car(); // Repetitive Code
    expect(car.wheels).toBe(4);
  });

  test('two newly created cars are object equal', () => {
    let car1 = new Car(); // Repetitive Code
    let car2 = new Car();

    expect(car1).toEqual(car2);
  });

  test('a newly created car does not have doors', () => {
    let car = new Car(); // Repetitive Code
    expect(car.doors).toBeUndefined();
  });
});
```
...use the `beforeEach()` method to instantiate objects/variables or invoke functions prior to each test.
```javascript
const Car = require('./car');

describe('The Car class', () => {
  let car; // note we declare outside of beforeEach due to lexical scope
  beforeEach(() => {
    car = new Car();
  });
  
  test('has four wheels', () => {
    expect(car.wheels).toBe(4);
  });

  test('two newly created cars are object equal', () => {
    let car2 = new Car();

    expect(car1).toEqual(car2);
  });

  test('a newly created car does not have doors', () => {
    expect(car.doors).toBeUndefined();
  });
});
```
### **E**xecute the code against the object we're testing
### **A**ssert the results of execution
### **T**ear down and clean up any lingering artifacts.
`afterEach()` is available for logging info, file cleanup, or stopping database connections after each test.

## Understanding code coverage
### Calculation
Determined based on percentage of functions/methods called by test OR percentage of lines of code executed by tests.
Does not consider if code does what it was designed to do, just that it was called by the test.
### Checking Coverage
```
jest --coverage todolist.test.js
```

# Packaging

## Project directory layout

### Project
A collection of files used to develop, test, build, and distribute software.
Software includes executable program, library module, or a combination.
The project includes the source code, tests, assets, databases, config files, and more.

### Setting Up a Project
1. Initialize repository (locally or remotely)
2. npm init (create package.json)
3. .gitignore (`echo node_modules >> .gitignore`)
4. Folders
  a. test: => contains all tests
  b. lib: => code files
  c. node_modules => created when downloading dependencies

## npm and npx
- npm => Used to install a package intended to be `require`'d by your project
- npx => Executable CLI tool used with project (ie eslint).

## package.json and package-lock.json

### `package.json`
A configuration file used to manage dependencies along with other ease of use features.
`npm init` => Estabilshes a `package.json`:
   - Store Dependencies and versioning preferences for project
   - Allow projects to be transmitted more efficiently
   - Allows someone to install depenencies automatically with `npm install`
   - Store scripts which can automate certain CLI commands

### `package-lock.json`
File which shows the precise versions of packages which were installed upon `npm install` or `npm i -S pkg`

### Installing 
1. install/uninstall globally: `npm i -g pkg` | `npm r -g pkg`
  - Installs in path for access by all directories
  - Recommended for CLI Executables (i.e. heroku) and other non-project related CLI tools.
  - Not recommended for project files since the environment cannot be easily cloned (ie versioning, dependencies)
2. install/uninstall: `npm i pkg` | `npm r pkg`
  - fine for trying out packages
  - does not save any dependency or versioning data
3. Install/Uninstall as Dependency: `npm i -S pkg` | `npm r -S pkg`
  - must have `package.json`
4. Install/Uninstall as Dependency: `npm i -D pkg` | `npm r -D pkg`
`npm prune` removes dependencies which were removed from `package.json` and no longer needed in `node_modules`

### Requiring specific parts of a library
```javascript
// This imports the entire lodash package
// Con: System memory needs to remember all this
// Con: Processing lags due to loading the entire package
const _ = require('lodash');

// this option only pull from the 'chunk' file
// Pro: Processing Efficient
// Pro: Memory Efficient
// Con: Only works for indepent files (no `require` within referenced file)
const chunk = require('lodash/chunk');

// this option loads the package, but only saves 'chunck'
// Pro: Memory Efficient
// Pro: Works with interdependent package files
// Con: Processing lags due to loading the package before extracting 'chunck'
const chunk = require('lodash').chunk;
```

## Transpilation
The process of converting source code into another language or version.

### Babel
Most widely used tool for ES6 => ES5 transpilation amongst many other.
To use Babel:
1. Configure Babel to run automatically
2. Install in Command Line (locally)
  - Install: `npm i -D @babel/core @babel/cli`
  - Transpile: `npx babel lib --out-dir dist`
    - This command transpiles all files in `lib` and puts thim in a directory `dist`
  - Install Presets/configure Babel to know how to transpiles
    - Ex: ES5 Preset `env`
      - Install preset => `npm install --save-dev @babel/preset-env`
      - Run Command with preset => `npx babel lib --out-dir dist --presets=@babel/preset-env`

## npm scripts
In `package.json`, key/value pairs contained in `"scripts": {}` become alias (key) for commands (value).
To use an alias, use `npm run` followed by script name

# Asynchronous programming
Asynchronous functions do not block execution for the rest of the program.
Asynchronous code doesn't run when the runtime encounters it
## `setTimeout`
Accepts a callback function and the time to delay execution (in milliseconds)
JS does nothing between the time the program finishes until the timer is up.
Furthermore, JS will not run `setTimeout` until the entire program is finished, even if the time is 0!
## `setInterval`
Accepts a callback function and a period of time to delay between invocations (in milliseconds)
```javascript
function save() {
  // Send the form values to the server for safekeeping
}

// Call save() every 10 seconds
var id = setInterval(save, 10000);

// Later, perhaps after the user submits the form
clearInterval(id);
```

## Promises
A promise is a class which has three potential states: pending, fulfilled, and rejected.
```javascript
let p = new Promise((resolve, reject) => { // promise takes a callback as argument
  let a = 1 + 1;
  if (a === 2) { // => condition for success
    resolve("Success");
  } else {
    reject("Failed");
  }
});

p.then((message) => { // => then is activated upon fulfillment and may be chained
  console.log(`This is in the then ${message}`);
}).catch((message) => { // => catch activated upon rejection and handles errors or restarts process
  console.log(`This is in the catch ${message}`);
})
```
## Event Loop

Regex Review https://launchschool.com/books/regex

Set up Practice Code Environment with ESLint