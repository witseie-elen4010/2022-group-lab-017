'use strict'
/* eslint-env jest */
const myModule = require('../public/scripts/modelingFunctionalities.js')
const randWord = myModule.method1
const checkWordlength = myModule.method2
const checkNextwords = myModule.method3
const checkGuess = myModule.method4

describe('Checking for generated random wordss ', () => {
  test('check random word lenght : Longer word ', () => { 
    const word = 'joseph'
    const result = false
    expect(checkWordlength(word)).toEqual(result)
  })

  test('check random word lenght : Shorter word ', () => { 
    const word = 'jos'
    const result = false
    expect(checkWordlength(word)).toEqual(result)
  })
  test('check random word length : 5 letter word ', () => { 
    const word = 'josep'
    const result = true
    expect(checkWordlength(word)).toEqual(result)
  })

  test('check random word length : random word Generator  ', () => { 
    const word = randWord()
    const result = true
    expect(checkWordlength(word)).toEqual(result)
  })
})

describe(' Random word generator  ', () => {
  //
  test('Generate two random word and check if they are similar  ', () => {    /// 1 in million to be true
    const word1 = randWord
    const word2 = 'clung'
    const result = false
    expect(checkNextwords(word1,word2)).toEqual(result)
  })
})

describe(' Checking input guesses from the user  ', () => {
    //
    test(' check for an input less of word less than 5   ', () => {    ///  Testing for user input 
      const word1 = 'two'
      const word2 = randWord
      const result = 'invalid word'
      expect(checkGuess(word1,word2)).toEqual(result)
    })

    test(' check for an input of greater than required size  ', () => {    ///  Testing for user input 
        const word1 = 'twotwo'
        const word2 = randWord
        const result = 'invalid word'
        expect(checkGuess(word1,word2)).toEqual(result)
      })
    
      test(' check for an input of size 5   ', () => {    ///  Testing for user input 
        const word1 = 'apple'
        const word2 = word1
        const result = 'Valid word' 
        expect(checkGuess(word1,word2)).toEqual(result)
      })
  })
 


