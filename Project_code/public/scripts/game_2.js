
import { states } from '../scripts/gameStates.js'
import { WORDS } from '/static/public/scripts/words.js'

//let rightGuessString_1 = randWord();
let rightGuessString = ""
let playerName_;

const socket = io.connect('http://localhost:3000')

let firstPlayer=false;
let roomID;
$("#objects").hide();


socket.on('word', (data)=>{
  rightGuessString = data.word
  console.log(data.word)
})

//Create Game Event Emitter
$(".createBtn").click(function(){
    firstPlayer=true;
    const playerName=$("input[name=p1name").val();
    playerName_ = playerName;
    socket.emit('createGame',{
      name:playerName,
    });
    console.log(playerName, roomID)
})

//New Game Created Listener
socket.on("newGame",(data)=>{
    $(".newRoom").hide();
    $(".joinRoom").hide();
    $("#message").html("Waiting for player 2, room ID is "+data.roomID).show();
    console.log(rightGuessString)
    roomID=data.roomID;
})

//Join Game Event Emitter
$(".joinBtn").click(function(){
    const playerName=$("input[name=p2name").val();
    roomID=$("input[name=roomID").val();
    playerName_ = playerName;
    rightGuessString = randWord();
    console.log(playerName, roomID, rightGuessString)
    socket.emit('joinGame',{
        name:playerName,
        roomID:roomID,
        word: rightGuessString,
    });
    $("#container").hide()
})

//Player 2 Joined
socket.on("player2Joined",(data)=>{
    transition(data)  ;
    $("#container").hide()
    $("#objects").show();
  })
  
//Player 1 Joined
socket.on("player1Joined",(data)=>{
    transition(data)  ;
    $("#container").hide()
    $("#objects").show();
})

const transition=(data)=>{
  $(".newRoom").hide();
  $(".joinRoom").hide();
  $(".leaderboard").hide();
  $(".controls").hide();
  $(".player1 .name").html(data.p1name);
  $(".player2 .name").html(data.p2name);
  $("#message").html(data.p2name+" is here!").hide();
  $("#objects").show();
}

//Select Choice
$(".controls button").click(function (){
  const guess=$(this).html().trim();
  const guessEvent=firstPlayer?"guess1":"guess2";
  socket.emit(guessEvent,{
      guess: guess,
      roomID:roomID
  });
})

//color the keyBoard of the opponent colour_board
socket.on('color_board2', (data)=>{
  console.log(data.opponentGuess, data.guessesRemaining_)
  const row = document.getElementsByClassName('letter-row2')[6 - data.guessesRemaining_]
  const rightGuess = Array.from(rightGuessString)
  for (let i=0; i<5; i++)
  {
    const box = row.children[i]
    let opponentGuess = data.opponentGuess;
    let letterColor = ''
    box.className = 'letter-box2'
    const letter = opponentGuess[i]

    const letterPosition = rightGuess.indexOf(opponentGuess[i])
    // is letter in the correct guess
    if (letterPosition === -1) {
      letterColor = 'grey'
    } else {
      // now, letter is definitely in word
      // if letter index and right guess index are the same
      // letter is in the right position
      if (opponentGuess[i] === rightGuess[i]) {
        // shade green
        letterColor = 'green'
      } else {
        // shade box yellow
        letterColor = 'yellow'
      }

      rightGuess[letterPosition] = '#'
    }

    const delay = 250 * i
    setTimeout(() => {
      // flip box
      animateCSS(box, 'flipInX')
      // shade box
      box.style.backgroundColor = letterColor
      shadeKeyBoard(letter, letterColor)
    }, delay)

  }
})


//opponent winning message
socket.on("won-message", (data)=>{
  toastr.error(`${data.name} has got the correct word`, 'Game Over!!:',`The correct word is ${rightGuessString}`,{timeOut: 9000})
  toastr.error(`The correct word is ${rightGuessString}`,{timeOut: 9000})
})

//opponent lossing message
socket.on("lost-message", (data)=>{
  toastr.info(`${data.name} has ran out of guesses`, {timeOut: 30000})
})


/// changing between states
const gameState = new states()
if (gameState.getcurrentState() == 'Menu') {
  // show player multi player options
  console.log(gameState.getcurrentState())
}

const NUMBER_OF_GUESSES = 6
let guessesRemaining = NUMBER_OF_GUESSES
let currentGuess = []
//let rightGuessString = rightGuessString_1 
let nextLetter = 0
let wordLength = 5;
// set up the sockets.io

window.onload =function(){
    initBoard();
    initBoard_2();
    GameLoop();
    correct();
    resert();
}

function correct(){
  var button = document.getElementById("word");
  button.onclick = function() {
      toastr.info(`The word of the day is: "${rightGuessString}"`, 'Hello Cheater!',{timeOut: 3000})
  }
}

function resert(){
       
        var button = document.getElementById("restart");
        button.onclick = function() {
        rightGuessString = randWord();
        guessesRemaining = NUMBER_OF_GUESSES;
        clearTable();
        nextLetter = 0;
        currentGuess.length = 0
        toastr.info('Game restarted!',{timeOut: 3000})
    }
}

function randWord(){
  let word = WORDS[Math.floor(Math.random() * WORDS.length)];
  return word;
}

function initBoard () {
  const board = document.getElementById('game-board_')

  for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
    const row = document.createElement('div')
    row.className = 'letter-row'

    for (let j = 0; j < 5; j++) {
      const box = document.createElement('div')
      box.className = 'letter-box'
      row.appendChild(box)
    }

    board.appendChild(row)
  }
}
function initBoard_2 () {
  const board = document.getElementById('game-board_2_')

  for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
    const row = document.createElement('div')
    row.className = 'letter-row2'

    for (let j = 0; j < 5; j++) {
      const box = document.createElement('div')
      box.className = 'letter-box2'
      row.appendChild(box)
    }

    board.appendChild(row)
  }
}


function shadeKeyBoard (letter, color) {
  for (const elem of document.getElementsByClassName('keyboard-button')) {
    if (elem.textContent === letter) {
      const oldColor = elem.style.backgroundColor
      if (oldColor === 'green') {
        return
      }

      if (oldColor === 'yellow' && color !== 'green') {
        return
      }

      elem.style.backgroundColor = color
      break
    }
  }
}

function GameLoop(){
  document.addEventListener('keyup', (e) => {
    if (guessesRemaining === 0) {
      return
    }
  
    const pressedKey = String(e.key)
    if (pressedKey === 'Backspace' && nextLetter !== 0) {
      deleteLetter()
      return
    }
  
    if (pressedKey === 'Enter') {
      checkGuess()
      return
    }
  
    const found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
  
    } else {
      insertLetter(pressedKey)
    }
  })
  }

function deleteLetter () {
  const row = document.getElementsByClassName('letter-row')[6 - guessesRemaining]
  const box = row.children[nextLetter - 1]
  box.textContent = ''
  box.classList.remove('filled-box')
  currentGuess.pop()
  nextLetter -= 1
}

function checkGuess () {
  const row = document.getElementsByClassName('letter-row')[6 - guessesRemaining]
  let guessString = ''
  const rightGuess = Array.from(rightGuessString)

  for (const val of currentGuess) {
    guessString += val
  }

  if (guessString.length != 5) {
    toastr.warning("Not enough letters!",'Warning:',{timeOut: 3000})
    return
  }

  if (!WORDS.includes(guessString)) {
    toastr.warning("Word not in guess list!",'Warning:',{timeOut: 3000})
    return
  }

  let arrColor = []

  for (let i = 0; i < 5; i++) {
    let letterColor = ''
    const box = row.children[i]
    const letter = currentGuess[i]

    const letterPosition = rightGuess.indexOf(currentGuess[i])
    // is letter in the correct guess
    if (letterPosition === -1) {
      letterColor = 'grey'
      arrColor.push('grey')
    } else {
      // now, letter is definitely in word
      // if letter index and right guess index are the same
      // letter is in the right position
      if (currentGuess[i] === rightGuess[i]) {
        // shade green
        letterColor = 'green'
        arrColor.push('green')
      } else {
        // shade box yellow
        letterColor = 'yellow'
        arrColor.push('yellow')
      }

      rightGuess[letterPosition] = '#'
    }

    const delay = 250 * i
    setTimeout(() => {
      // flip box
      animateCSS(box, 'flipInX')
      // shade box
      box.style.backgroundColor = letterColor
      shadeKeyBoard(letter, letterColor)
    }, delay)
  }

  socket.emit('colors2', {
    currentGuess: currentGuess,
    colors: arrColor,
    guessesRemaining: guessesRemaining,
    roomID: roomID,
  })

  if (guessString === rightGuessString) {
    toastr.success("You guessed right! Game over!",'Winner!',{timeOut: 3000})
    socket.emit("won", {
      name: playerName_,
      roomID: roomID,
    })
    console.log("won", playerName_, roomID)
    guessesRemaining = 0
  } else {
    guessesRemaining -= 1
    currentGuess = []
    nextLetter = 0

    if (guessesRemaining === 0) {
            toastr.error("You've run out of guesses!", 'Game Over!!:',{timeOut: 3000})
            setTimeout(function(){
              toastr.info(`The right word was: "${rightGuessString}"`, 'Word of the day!',{timeOut: 3000})}, 3000)  
              socket.emit("lost", {
                name: playerName_,
                roomID: roomID,
              })          
            }
    }
  }

function insertLetter (pressedKey) {
  if (nextLetter === 5) {
    return
  }
  pressedKey = pressedKey.toLowerCase()

  const row = document.getElementsByClassName('letter-row')[6 - guessesRemaining]
  const box = row.children[nextLetter]
  animateCSS(box, 'pulse')
  box.textContent = pressedKey
  box.classList.add('filled-box')
  currentGuess.push(pressedKey)
  nextLetter += 1


}

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`
    // const node = document.querySelector(element);
    const node = element
    node.style.setProperty('--animate-duration', '0.3s')

    node.classList.add(`${prefix}animated`, animationName)

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd (event) {
      event.stopPropagation()
      node.classList.remove(`${prefix}animated`, animationName)
      resolve('Animation ended')
    }

    node.addEventListener('animationend', handleAnimationEnd, { once: true })
  })

document.getElementById('keyboard-cont').addEventListener('click', (e) => {
  const target = e.target

  if (!target.classList.contains('keyboard-button')) {
    return
  }
  let key = target.textContent

  if (key === 'Del') {
    key = 'Backspace'
  }

  document.dispatchEvent(new KeyboardEvent('keyup', { key: key }))
})

function clearTable(){
    for(let i=0; i<NUMBER_OF_GUESSES; i++)
    {
        let row = document.getElementsByClassName("letter-row")[i]
    
        for(let j=0; j<wordLength; j++)
        {
            let box = row.children[j]
            box.textContent = ""
            box.classList.remove("filled-box")
            box.style.backgroundColor = ""
        }
    }
}

document.getElementById("Enter").addEventListener('click', ()=>{
  socket.emit("guess1", currentGuess)
  console.log(currentGuess)
})
