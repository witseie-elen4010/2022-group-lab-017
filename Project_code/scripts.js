'use strict'

// creating the game board
const board = document.getElementById('game-board')
for (let i = 0; i < 6; i++) {
  const row = document.createElement('div')
  row.className = 'letter-row'

  for (let j = 0; j < 5; j++) {
    const box = document.createElement('li')
    box.className = 'letter-box'
    row.append(box)
  }
  board.appendChild(row)
}
// ---------- Handling user Input ------------
const numberOfguesses = 0
let nextLetter = 0
const word = []

document.querySelectorAll('.keyboard-button').forEach(item => {
  item.addEventListener('click', event => {
    // handle clicking
    const clickedLetter = item.textContent

    // Check for deleting
    if (clickedLetter === 'Del') {
      // erase a letter
    } else if (clickedLetter === 'Enter') {
      /// go to next line
    } else {
      insertLetter(clickedLetter)
      console.log(item.innerHTML)
      if (word.length < 5) { /// verify length is still less than five
        console.log(word)
        word.push(clickedLetter)
      }
    }
  })
})
/// Inserting a letter
function insertLetter (letter) {
  const row = document.getElementsByClassName('letter-row')[numberOfguesses]
  const box = row.children[nextLetter]
  box.textContent = letter
  box.classList.add('filled-box')
  nextLetter += 1
}
