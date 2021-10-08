setTimeout(function() { 
  setTimeout(function() {
    q(); // 7
  }, 15);

  d(); // 3

  setTimeout(function() {
    n(); // 5
  }, 5);

  z(); // 4
}, 10);

setTimeout(function() {
  s(); // 6
}, 20);

setTimeout(function() { 
  f(); // 2
});

g(); // 1