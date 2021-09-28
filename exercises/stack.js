function newStack() {
  let stack = [];
  return {
    push(element) {
      stack.push(element);
    },
    
    pop() {
      return stack.pop();
    },
    
    printStack() {
      for (let idx = stack.length - 1; idx >= 0; idx--) {
        console.log(stack[idx]);
      }
    }
  };
}

let stack1 = newStack();
stack1.push(1);
stack1.push(2);
stack1.push(3);
stack1.printStack();
console.log(stack1.pop());
stack1.printStack();