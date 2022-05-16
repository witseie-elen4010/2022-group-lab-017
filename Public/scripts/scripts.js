'use strict'

// creating the game board
const board = document.getElementById('game-board')
for (let i = 0; i < 6; i++) {
  const row = document.createElement('div')
  row.className = 'letter-row'

  for (let j = 0; j < 5; j++) {
    const box = document.createElement('div')
    box.className = 'letter-box'
    row.appendChild(box)
  }
  board.appendChild(row)
}
