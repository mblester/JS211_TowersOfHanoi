'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
const movePiece = (startStack, endStack) => {
  // Your code here
  console.log('INSIDE MOVE PIECE', stacks[startStack], stacks[endStack])
// remove last item from start stack
let lastItem = stacks[startStack].pop();

stacks[endStack].push(lastItem)
// add removed item to endStack
}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack) => {
  // Your code here weight
  if(typeof startStack !== 'string' || typeof endStack !== 'string'){
    
    return false; 
  }

  //create a for..in loop to iterate over the properties in stacks object
  for(let key in stacks){
    //if the current key you're iterating over does not have an array value then console log the following statement and return false
    if(Array.isArray(stacks[key]) === false){
     console.log('Invalid Data. Each key is supposed to be an array.'); 
     return false; 
    }
  }

  // reassign startStack and endStack to the same values but lowercase and with no whitespace
  startStack = startStack.toLowerCase().trim(); 
  endStack = endStack.toLowerCase().trim(); 

  //if either the start or end stack input are strings 'a', 'b', and 'c', then log the following message and return false
  if((startStack !== 'a' && startStack !== 'b' && startStack !== 'c') || (endStack !== 'a' && endStack !== 'b' && endStack !== 'c')){

    console.log('Must use the three stacks of Towers Of Hanoi which are A, B, and C.');
    return false; 
  }

  //reassign start and end stacks to be object[key]. This will give me direct access to the array values
  startStack = stacks[startStack]; 
  endStack = stacks[endStack]; 

  //startStack and endStack arrays at the last index will give access to whatever element is there and then store in these 2 variables 
  let lastTokenOfStartStack = startStack[startStack.length -1]; 
  let lastTokenOfEndStack = endStack[endStack.length -1];


  //If the endstack array is empty then automatically move piece and return true, otherwise if the last token removed from the start stack array is less than the last token in the end stack array then allow the move (return true), else return false and say illegal move. 
  
  if(endStack.length === 0){ 
    movePiece(lastTokenOfStartStack, startStack, endStack); 
    return true; 
  }else if(lastTokenOfStartStack < lastTokenOfEndStack){
    movePiece(lastTokenOfStartStack, startStack, endStack); 
    return true; 
  }else{
    return false; 
  } 

}


// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  for(let key in stacks){
    //if the current key you're iterating over has an array value of [4, 3, 2 ,1] then return true
    if(stacks[key][0] === 4 && stacks[key][1] === 3 && stacks[key][2] === 2 && stacks[key][3] === 1){
      return true;  
    }
  }
  //if none of the keys you're iterating over have an array value of [4, 3, 2, 1] then return false 
  return false; 
}


// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  movePiece(startStack, endStack);
  if(isLegal(startStack, endStack)){
    return true;
  }else{
    console.log('illegal move');
  }
};

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
