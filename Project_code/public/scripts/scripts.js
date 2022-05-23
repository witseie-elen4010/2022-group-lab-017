import { WORDS } from "/static/public/scripts/words.js";

const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]
let Column =  0;
let Row = 0;
let wordLength = 5;
var gameover = false;

window.onload =function(){
    initBoard();
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
        rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]
        guessesRemaining = NUMBER_OF_GUESSES;
        clearTable();
        nextLetter = 0;
        currentGuess.length = 0
        toastr.info('Game restarted!',{timeOut: 3000})
    }
}

//console.log(rightGuessString)

function initBoard(){
    let board = document.getElementById("game-board");
    console.log("Executing")
    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"
        
        for (let j = 0; j < wordLength; j++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            row.appendChild(box)
        }

        board.appendChild(row)
    }
}

function GameLoop(){
document.addEventListener("keyup", (e) => {
    if(guessesRemaining === 0) { return; }

    else{
    let pressedKey = String(e.key)
    let found = pressedKey.match(/[a-z]/gi)

    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter()
        return
    }

    if (e.code == "Enter") {
        checkGuess()
        return
    }

    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
     }
    }
  })
}

function checkGuess () {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let guessString = ''
    let rightGuess = Array.from(rightGuessString)
    
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
        let box = row.children[i]
        let letter = currentGuess[i]
        
        let letterPosition = rightGuess.indexOf(currentGuess[i])
        // is letter in the correct guess
        if (letterPosition === -1) {
            letterColor = 'grey'
        } else {
            // now, letter is definitely in word
            // if letter index and right guess index are the same
            // letter is in the right position 
            if (currentGuess[i] === rightGuess[i]) {
                // shade green 
                letterColor = 'green'
            } else {
                // shade box yellow
                letterColor = 'yellow'
            }

            rightGuess[letterPosition] = "#"
        }

        let delay = 250 * i
        setTimeout(()=> {
            //flip box
            animateCSS(box, 'flipInX')
            //shade box
            box.style.backgroundColor = letterColor
            shadeKeyBoard(letter, letterColor)
        }, delay)
    }

    if (guessString === rightGuessString) {
        toastr.success("You guessed right! Game over!",'Winner!',{timeOut: 3000})
        guessesRemaining = 0
        return
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;


        if (guessesRemaining === 0) {
            toastr.error("You've run out of guesses!", 'Game Over!!:',{timeOut: 3000})
            toastr.info(`The right word was: "${rightGuessString}"`, 'Word of the day!',{timeOut: 3000})
        }
    }
}

function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor
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

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);
    const node = element
    node.style.setProperty('--animate-duration', '0.3s');
    
    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
});

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target
    
    if (!target.classList.contains("keyboard-button")) {
        return
    }
    let key = target.textContent

    if (key === "Del") {
        key = "Backspace"
    }  
    
    if (key === "Enter") {
        key = "Enter"
    } 

    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})

function insertLetter (pressedKey) {
    if (nextLetter === 5) {
        return
    }
    else{
        pressedKey = pressedKey.toLowerCase()

        let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
        let box = row.children[nextLetter]
        animateCSS(box, "pulse")
        box.textContent = pressedKey
        box.classList.add("filled-box")
        currentGuess.push(pressedKey)
        nextLetter += 1 
    } 
}

function deleteLetter () {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter - 1]
    box.textContent = ""
    box.classList.remove("filled-box")
    currentGuess.pop()
    nextLetter -= 1
}

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