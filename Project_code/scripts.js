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
let numberOfguesses = 0
let nextLetter = 0
let word = []

document.querySelectorAll('.keyboard-button').forEach(item => {
  item.addEventListener('click', event => {
    // handle clicking
    const clickedLetter = item.textContent

    // Check for deleting
    if (clickedLetter === 'Del') {
      DeleteLetter() // erase a letter
    } else if (clickedLetter === 'Enter') {
      /// go to next line
      checkGuesedWord() // Check inserted word
    } else {
      if (word.length < 5 && numberOfguesses < 6) { /// verify length is still less than five
        console.log(word)
        word.push(clickedLetter)
        insertLetter(clickedLetter)
        console.log(item.innerHTML)
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
/// Handling for delete
function DeleteLetter () {
  const row = document.getElementsByClassName('letter-row')[numberOfguesses]

  if (nextLetter !== 0) {
    nextLetter -= 1
    word.pop()
  } else { /// taking care of the deleteing at first block to avoid errors
    nextLetter = 0
  }
  const box = row.children[nextLetter]
  box.textContent = ''
}
/// / checking for the correct word
function checkGuesedWord () {
  if (numberOfguesses < 6) numberOfguesses += 1
  nextLetter = 0
  word = []
  /// Implement te function for searching the correct word
}
