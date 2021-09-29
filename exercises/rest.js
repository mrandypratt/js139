let { log } = require("./log");

function sum(...values) {
  return values.reduce(function(a, b) {
    return a + b;
  });
}

log(sum(1, 4, 5, 6)); // 16