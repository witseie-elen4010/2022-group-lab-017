
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
let users = 0;
let rightGuessString = "green";
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
        players[roomID]=data.name;
        socket.emit("newGame",{roomID:roomID});

    })

    //Join Game Listener
    socket.on("joinGame",(data)=>{        
        socket.join(data.roomID);
        socket.to(data.roomID).emit("player2Joined",{p2name: data.name,p1name:players[data.roomID]});
        socket.emit("player1Joined",{p2name:players[data.roomID],p1name:data.name});
    })
    socket.on('colors', (data)=>{
      console.log(data.colors, data.currentGuess, data.guessesRemaining)
      socket.broadcast.emit('color_board', {
        opponentGuess: data.currentGuess,
        guessesRemaining_: data.guessesRemaining
      })
    })

})

server.listen(3000, () => {
  console.log(' server listening on *:3000')
})