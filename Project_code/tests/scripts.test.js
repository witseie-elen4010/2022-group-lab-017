//const gameState = require('./../public/scripts/scripts')

import fetch from 'node-fetch';
import gamestate from './../public/scripts/scripts'

test('gamestate is properly working', () => {
    expect(gameState).toBe("Menu")
})