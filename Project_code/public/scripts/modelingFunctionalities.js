'use strict'
/// this will model game player classes to see record the method of operation during the game
import { WORDS } from '/static/public/scripts/words.js'

let rightGuessString 
let NUMBER_OF_GUESSES = 6
let guessesRemaining = 6

/// testing for random words
function randWord(){
    let word = WORDS[Math.floor(Math.random() * WORDS.length)];
    return word;
  }

function checkWordlength( word){
    if(word.length === 5 ){
        return true
    }else{
        return false
    }
}

function checkNextwords(){
    const word1 = randWord();
    const word2 = randWord();

    return {word1 === word2}
}

guessesRemaining =0
NUMBER_OF_GUESSES = 0
rightGuessString = 'new'
