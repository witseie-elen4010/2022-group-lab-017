'use strict'
/// this will model game player classes to see record the method of operation during the game
 const WORDS = ['tuned','crisp','ledge','dived','swamp','stout','folds','seize','hilly','joins','pluck','stack','lords','dunes','burro', 'hawks', 'trout','feeds','scarf','halls','coals','towel','souls','elect','buggy','pumps','loans','spins','files','oxide','pains','photo','rival','flats','syrup','rodeo','sands','moose','pints' ]
/// MODEL OF WORDS with  valid words 
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

function checkNextwords( word1, word2){
if(word1 === word2){
    return true
}else{
    return false}
}

function checkGuess(word,rightGuessString){

 if(checkWordlength (word)){             /// first check for the correct input 
     if( word === rightGuessString) {
    /// reset the game 
      NUMBER_OF_GUESSES == 6
      guessesRemaining == 6 
      rightGuessString == randWord()//  a new word will be assigned
     } else { /// do nothing }
     }
     return 'Valid word'
     }else{
         return 'invalid word'
     }
    }
    
    module.exports = {
        method1: randWord,
        method2: checkWordlength,
        method3: checkNextwords,
        method4: checkGuess
      }

