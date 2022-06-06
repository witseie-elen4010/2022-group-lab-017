
import { states } from '../scripts/gameStates.js'
import { WORDS } from '/static/public/scripts/words.js'
//const db = require('../../Backend/Configs/db.js')

//let rightGuessString_1 = randWord();
let rightGuessString = ""

const socket = io.connect(`http://localhost:3000`)

let roomID;
let playerName_;
let decisions = 0;
let opponent1={name: "opponent1"};
let opponent2={name: "opponent2"};

/********************* */
/*                     */
/*   EVENTS HANDLER    */
/*                     */
/********************* */


$("#objects").hide();
$("#word-div").hide();
$("#wait").hide();

//takes care of the players name
socket.on("playerName1", (data)=>{
    playerName_ = data.name
    roomID = data.roomID
    console.log(data.roomID)
    const board = document.getElementById("game-board")
    const tag = document.createElement("h2")
    tag.innerHTML = data.name
    tag.id = "player"
    board.appendChild(tag)
})

//takes care of the players name
socket.on("playerName2", (data)=>{
    playerName_ = data.name
    roomID = data.roomID
    const board = document.getElementById("game-board")
    const tag = document.createElement("h2")
    tag.innerHTML = data.name
    tag.id = "player"
    board.appendChild(tag)
})

//takes care of the players name
socket.on("playerName3", (data)=>{
    playerName_ = data.name
    roomID = data.roomID
    const board = document.getElementById("game-board")
    const tag = document.createElement("h2")
    tag.innerHTML = data.name
    tag.id = "player"
    board.appendChild(tag)
})

//Create Game Event Emitter
$(".createBtn").click(function(){
  if($("input[name=p1name").val() !=="")
  {
    const playerName=$("input[name=p1name").val();
    socket.emit('createGame',{name:playerName});
    console.log(playerName, roomID)
  }
    
})

//get the word to be guessed from the server
socket.on('word', (data)=>{
  rightGuessString = data.word
  console.log(data.word)
})

//New Game Created Listener
socket.on("newGame",(data)=>{
    $(".newRoom").hide();
    $(".joinRoom").hide();
    $("#message").html("Waiting for opponent 1 and opponent 2 to join, room ID is "+data.roomID).show();
    roomID=data.roomID;
})

//Join Game Event Emitter
$(".joinBtn").click(function(){

  if ($("input[name=p2name").val() !=="" && $("input[name=roomID").val() !== "")
  {
    const playerName=$("input[name=p2name").val();
    roomID=$("input[name=roomID").val();
    console.log(playerName, roomID)
    socket.emit('joinGame',{
        name:playerName,
        roomID:roomID,
    });
    $(".newRoom").hide();
    $(".joinRoom").hide();
    $("#message").html("Waiting  opponent 2 to join, room ID is "+ roomID).show();
  }  
})

//Join Game Event Emitter
$(".joinBtn2").click(function(){

  if ($("input[name=p3name").val() !=="" && $("input[name=roomID3").val() !=="")
  {
    const playerName=$("input[name=p3name").val();
    roomID=$("input[name=roomID3").val();
    rightGuessString = randWord();
    console.log(playerName, roomID, rightGuessString)
    socket.emit('joinGame3',{
        name:playerName,
        roomID:roomID,
        word: rightGuessString,
    });
    $("#container").hide()
    $("#word-div").show()
    $("#wait").hide()
  }
})

//this displays the game after player three has jounined
socket.on("IJoined",(data)=>{
    $("#container").hide()
    $("#wait").hide();
    $("#word-div").show();
    
  })
socket.on("Joined",()=>{
    $("#container").hide()
    $("#wait").hide();
    $("#word-div").show();
})

//color the keyBoard of the opponent colour_board
socket.on('color_board', (data)=>{
    let row; //=document.getElementsByClassName('letter-row2')[6 - data.guessesRemaining_];

    if (opponent1.name === "opponent1")
    {
       opponent1 = {
           name: data.name
       } 
      const board = document.getElementById("game-board_2")
      const tag = document.createElement("h2")
      tag.innerHTML = data.name
      tag.id = "opponent1";
      board.appendChild(tag)
    }
    else if (opponent1.name!== data.name && opponent2.name !==data.name)
    {
        opponent2 = {
            name: data.name
        }
        const board = document.getElementById("game-board_3")
        const tag = document.createElement("h2")
        tag.innerHTML = data.name
        tag.id = "opponent2"
        board.appendChild(tag)
    }

   if (opponent1.name===data.name)
   {
    row = document.getElementsByClassName('letter-row2')[6 - data.guessesRemaining_]
   }
   if (data.name===opponent2.name)
   {
    row = document.getElementsByClassName('letter-row3')[6 - data.guessesRemaining_]
   }
  console.log(opponent1.name, opponent2.name)
  
  const rightGuess = Array.from(rightGuessString)
  for (let i=0; i<5; i++)
  {
    const box = row.children[i]
    let opponentGuess = data.opponentGuess;
    let letterColor = ''
    //box.className = 'letter-box2'
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


/***********************/
/*                     */
/*  WORD FORM          */
/*  LISTENERS          */
/***********************/

let not_playing = false;

document.getElementById("cancel").addEventListener('click', ()=>{
  decisions++;
  $("#word-div").hide();
  $("#wait").show();
  socket.emit("my-decision", {
    roomID: roomID,
    decision: 1,
  })
  console.log(playerName_)
  if (decisions===3)
  {
    $("#word-div").hide();
    $("#wait").hide();
    $("#objects").show();
  } 
})

document.getElementById("submit").addEventListener("click", ()=>{
  if($("#word-set").val().length===5 && WORDS.includes($("#word-set").val())){
  not_playing = true;
  socket.emit("play", {
    roomID: roomID,
    word: $("#word-set").val(),
    name: playerName_,
  });
  rightGuessString = $("#word-set").val(), 
  $("#word-div").hide();
  $("#wait").hide();
  $("#objects").show();
  document.getElementById("game-board").style.backgroundColor = "yellow";
  $("#keyboard-cont").hide();
  const board = document.getElementById("game-board")
  const tag = document.createElement("h2")
  tag.innerHTML = "YOU ARE NOT ALLOWED TO PLAY"
  tag.id = "spectator"
  board.appendChild(tag)
  clearTable();
  document.getElementsByClassName("keyboard-button").disabled = true;
  board.disabled = true;
}
  else
  {
    if ($("#word-set").val().length != 5) {
      toastr.warning("The word should have 5 letters!", 'warning: ',{timeOut: 3000})
      return
    }
    if (!WORDS.includes($("#word-set").val())) {
      toastr.warning("Word not in guess list!",'Warning:',{timeOut: 3000})
      toastr.warning("use lowercase letter if the word exists",'Warning:',{timeOut: 3000})
      return
    }
  }
})

socket.on('decisions', (data)=>{
  decisions += data.decision;
  console.log(playerName_,decisions, data.decision)
  if (decisions === 3)
  {
    $("#word-div").hide();
    $("#wait").hide();
    $("#objects").show()
  }
})

socket.on('word-set', (data)=>{
  rightGuessString = data.word;
  toastr.info(`${data.name} SET THE WORD TO BE GUESSED`, {timeOut: 30000})
  toastr.info(`HE IS NOT PART OF THE GAME`, {timeOut: 30000}) 
  opponent1 = data.name;
  document.getElementById("game-board_2").style.backgroundColor = "yellow";
  $("#word-div").hide();
  $("#wait").hide();
  $("#objects").show();
  const board = document.getElementById("game-board_2")
  const tag = document.createElement("h2")
  tag.innerHTML = data.name + " IS NOT ALLOWED TO PLAY"
  tag.id = "spectator1"
  board.appendChild(tag)
})


/********************* */
/*                     */
/*        GAME         */
/*                     */
/********************* */

/// changing between states
const gameState = new states()
if (gameState.getcurrentState() == 'Menu') {
  // show player multi player options
  console.log(gameState.getcurrentState())
}

const NUMBER_OF_GUESSES = 6
let guessesRemaining = NUMBER_OF_GUESSES
let currentGuess = []
let nextLetter = 0
let wordLength = 5;
// set up the sockets.io

window.onload =function(){
    initBoard();
    initBoard_2();
    initBoard_3();
    GameLoop();
}

function randWord(){
  let word = WORDS[Math.floor(Math.random() * WORDS.length)];
  return word;
}

/*function fetchWordDatabase(){
  db.pools
  .then((pool) => {
    return pool.request()
      .query('SELECT COUNT(*) from Users')
  })
  .then(result => {
    
  return word;
}

function populateWordDatabase(){
  for(let i = 0; i < WORDS.length();i++ )
  {
    let word = WORDS[i];
    db.pools
            .then((pool) => {
              return pool.request()
                .input('word', db.sql.Char, word)
                .query('INSERT INTO Words (Word) VALUES (@word)')
            })
  }
}
*/
function initBoard () {
  const board = document.getElementById('game-board')

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
  const board = document.getElementById('game-board_2')

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

function initBoard_3 () {
    const board = document.getElementById('game-board_3')
  
    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
      const row = document.createElement('div')
      row.className = 'letter-row3'
  
      for (let j = 0; j < 5; j++) {
        const box = document.createElement('div')
        box.className = 'letter-box3'
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

let arrColor = [];
function checkGuess () {
  let guessString = ''
  if (not_playing===false)
  {
  const row = document.getElementsByClassName('letter-row')[6 - guessesRemaining]
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
  }


  //emits guess information
  socket.emit('colors', {
    name: playerName_,
    currentGuess: currentGuess,
    colors: arrColor,
    guessesRemaining: guessesRemaining,
    roomID: roomID,
  })



  if (guessString === rightGuessString) {
    toastr.success("You guessed right! Game over!",'Winner!',{timeOut: 6000})
    socket.emit("won", {
      name: playerName_,
      roomID: roomID,
    })
    guessesRemaining = 0
  } else {
    guessesRemaining -= 1
    currentGuess = []
    nextLetter = 0

    if (guessesRemaining === 0) {

            toastr.error("You've run out of guesses!", 'Game Over!!:',{timeOut: 6000})
            setTimeout(function(){
              toastr.info(`The right word was: "${rightGuessString}"`, 'Word of the day!',{timeOut: 3000})}, 3000)     
              socket.emit("lost", {
                name: playerName_,
                roomID: roomID,})
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
