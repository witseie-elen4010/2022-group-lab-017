//const gameState = require('./../public/scripts/scripts')

//import fetch from 'node-fetch';
//import gamestate from '../public/scripts/scripts'
//const sum = require('./sum')

/*test('gamestate is properly working', () => {
    expect(gameState).toBe("Menu")
})
*/

function sum (a, b) {
    return a + b
}


test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3) // assertion
})