
const mainRouter = require('./Project_code/Backend/Routes/mainRoutes')
const userAccountRouter = require('./Project_code/Backend/Routes/userAccount')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
// const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/static', express.static('Project_code'))
app.use(mainRouter)
app.use(userAccountRouter)

/// seting up the sockets.io
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

//ALL player info
let players={};

//used to generate the game ID
const randomstring = require('randomstring');

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
   
  //Create Game Listener
    socket.on("createGame",(data)=>{
        const roomID=randomstring.generate({length: 4});    
        socket.join(roomID); 
        console.log(data.name, roomID)       
        players[roomID]=data.name;
        socket.emit("newGame",{
          roomID:roomID,
          word: data.word,
        });
        socket.to(roomID).emit('player1', {name: data.name})

        //emit an event with the player name and room ID
        socket.emit('playerName1', {
          name: data.name,
          roomID: roomID,
        })
    })

    //Join Game Listener
    socket.on("joinGame",(data)=>{        
        socket.join(data.roomID);
        console.log(data.name, data.roomID)
        socket.to(data.roomID).emit("Joined_",{});
        socket.emit("IJoined_",{});

        //emit an event with the player name and room ID
        socket.emit('playerName2', {
          name: data.name,
          roomID: data.roomID,
        })

        //emits an event to all clients in room with iD = roomID for the two player game
        socket.to(data.roomID).emit('word', {word: data.word})
      })

    //Join Game Listener
    socket.on("joinGame3",(data)=>{        
      socket.join(data.roomID);
      console.log(data.name, data.roomID)
      socket.to(data.roomID).emit("Joined",{});
      socket.emit("IJoined",{});
      socket.emit('playerName3', {
        name: data.name,
        roomID: data.roomID,
      })

      //emits an event to all clients in room with iD = roomID for the three player game
      socket.to(data.roomID).emit('word', {word: data.word,})
    })

    //this part listens to an event when a player has made a guess for the the two player game
    socket.on('colors', (data)=>{
      console.log(data.name, data.roomID, data.colors, data.currentGuess, data.guessesRemaining)

      //emits an event to all clients in room with iD = roomID
      socket.to(data.roomID).emit('color_board', {
        opponentGuess: data.currentGuess,
        guessesRemaining_: data.guessesRemaining,
        name: data.name,
      })
    })

    //this part listens to an event when a player has made a guess for the the two player game
    socket.on('colors2', (data)=>{
    console.log(data.roomID, data.colors, data.currentGuess, data.guessesRemaining)

    //emits an event to all clients in room with iD = roomID
      socket.to(data.roomID).emit('color_board2', {
        opponentGuess: data.currentGuess,
        guessesRemaining_: data.guessesRemaining,
      })
    })

    //this part listens an event when a player has won the game
    socket.on("won", (data)=>{
      console.log(data.name)

      //emits an event to all clients in room with iD = roomID to alert them that there is a player who has won the game
      socket.to(data.roomID).emit("won-message", {
        name: data.name,
      })
      
    })

    //this part listens to an event when a player has lost
    socket.on("lost", (data)=>{

      //emits a lost event to all clients in room with iD = roomID
      socket.to(data.roomID).emit("lost-message", {
        name: data.name,
      })
    })

    //this part listens to players events which refused to choose a word to guessed for the three player game
    socket.on("my-decision", (data)=>{
      socket.to(data.roomID).emit("decisions", {decision: data.decision})
      socket.emit("I-cancel", {ICancel: data.ICancel})
      console.log(data.decision, data.ICancel)
    })

    //this part listens to an event when a player has submitted a word to be guessed
    socket.on("play", (data)=>{

      //emits an event to all clients in room with iD = roomID to give them the new word to be guessed set by one of the players
      socket.to(data.roomID).emit("word-set", {
        word: data.word,
        name: data.name
      })
      console.log("word set by: ", data.name, data.word)
    })

    //this part listens to an event when the other two players refused to choose a word to to guessed for the three player game
    socket.on("two-cancels", (data)=>{

      //emits an event to all clients in room with iD = roomID to give allowance to play the game
      socket.to(data.roomID).emit("play-game", {decision: data.decision})
    })
})

//this part listens to there port
const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log(' server listening on *:3000')
})