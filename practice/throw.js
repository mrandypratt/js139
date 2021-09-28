let arr = [1, 2, 3];

arr.forEach(elem => {
  if (elem === 2) {
    throw "Illegal number 2";
  }
  
  console.log(elem);
});

// 1

// /home/ec2-user/environment/js139/practice/throw.js:5
//     throw "Illegal number 2";
//     ^
// Illegal number 2
// (Use `node --trace-uncaught ...` to show where the exception was thrown)

// let arr = [1, 2, 3];

// arr.forEach(elem => {
//   if (elem === 2) {
//     throw new Error("Illegal number 2");
//   }
  
//   console.log(elem);
// });

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