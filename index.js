
const mainRouter = require('./Project_code/Backend/Routes/mainRoutes')
const userAccountRouter = require('./Project_code/Backend/Routes/userAccount')
const bcrypt = require('bcrypt')
// const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/static', express.static('Project_code'))
app.use(mainRouter)
app.use(userAccountRouter)
/// seting up the sockets.io

// app.use('/static', socket.static(sever))
let room_number = 1
let number_of_connectors = 0
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

//ALL player info
let players={};
let boards={};
let rightGuessString = "";
let opponents = [];
const randomstring = require('randomstring');

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.send(rightGuessString);
   
  //Create Game Listener
    socket.on("createGame",(data)=>{
        const roomID=randomstring.generate({length: 4});    
        socket.join(roomID); 
        console.log(data.name, roomID)       
        players[roomID]=data.name;
        //rightGuessString = data.word
        socket.emit("newGame",{
          roomID:roomID,
          word: data.word,
        });
        socket.to(roomID).emit('player1', {name: data.name})
        socket.emit('playerName1', {
          name: data.name,
          roomID: roomID,
        })
        socket.to(roomID).emit('opponent1', {
          name: data.name,
          roomID: roomID,
        })
        socket.to(roomID).emit("opponent", {
          name: data.name,
          roomID: roomID,
        })
    })

    //Join Game Listener
    socket.on("joinGame",(data)=>{        
        socket.join(data.roomID);
        console.log(data.name, data.roomID)
        socket.to(data.roomID).emit("player2Joined",{p2name: data.name,p1name:players[data.roomID]});
        socket.emit("player1Joined",{p2name:players[data.roomID],p1name:data.name});
        socket.to(data.roomID).emit('player2', {name: data.name})
        socket.emit('playerName2', {
          name: data.name,
          roomID: data.roomID,
        })
        socket.to(data.roomID).emit('opponent2', {
          name: data.name,
          roomID: data.roomID,
        })
        socket.to(data.roomID).emit("opponent", {
          name: data.name,
          roomID: data.roomID,
        })
        socket.to(data.roomID).emit('word', {word: data.word})
      })

    //Join Game Listener
    socket.on("joinGame3",(data)=>{        
      socket.join(data.roomID);
      console.log(data.name, data.roomID)
      socket.to(data.roomID).emit("player3Joined",{p2name: data.name,p1name:players[data.roomID]});
      socket.emit("player2Joined",{p2name:players[data.roomID],p1name:data.name});
      socket.to(data.roomID).emit('player3', {name: data.name})
      socket.emit('playerName3', {
        name: data.name,
        roomID: data.roomID,
      })
      socket.to(data.roomID).emit('opponent3', {
        name: data.name,
        roomID: data.roomID,
      })
      socket.to(data.roomID).emit("opponent", {
        name: data.name,
        roomID: data.roomID,
      })
      socket.to(data.roomID).emit('word', {word: data.word})
    })

    socket.on('colors', (data)=>{
      console.log(data.name, data.roomID, data.colors, data.currentGuess, data.guessesRemaining)
      socket.to(data.roomID).emit('color_board', {
        opponentGuess: data.currentGuess,
        guessesRemaining_: data.guessesRemaining,
        name: data.name,
      })
    })

    socket.on('colors2', (data)=>{
    console.log(data.roomID, data.colors, data.currentGuess, data.guessesRemaining)
      socket.to(data.roomID).emit('color_board2', {
        opponentGuess: data.currentGuess,
        guessesRemaining_: data.guessesRemaining,
      })
    })

    socket.on("won", (data)=>{
      console.log(data.name)
      socket.to(data.roomID).emit("won-message", {
        name: data.name,
      })
      
    })

    socket.on("names", (data)=>{
      socket.to(data.roomID).emit("setnames", {
        name: data.name,
      })
    })

    socket.on("lost", (data)=>{
      socket.to(data.roomID).emit("lost-message", {
        name: data.name,
      })
    })
})

server.listen(3000, () => {
  console.log(' server listening on *:3000')
})