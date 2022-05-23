'use strict'
// this will create different game states for wordle++
export const all_states = ['menu', 'Single Player', 'Two Player', 'Three Player']
let currentState
export class states {
  constructor () {
    currentState = 'Menu'
  }
 changeState = function (state){
      currentState == state;
  }
   getcurrentState = function (){
    return currentState;
  }
}

