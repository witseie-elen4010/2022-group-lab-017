
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
const { addUser, removeUser, getUser, getUsersInRoom, availableRooms, getRooms } = require('../2022-group-lab-017/Project_code/public/scripts/users')

// Create two player rooms

const rooms = availableRooms(room_number)
io.on('connection', function (socket) {
  if (number_of_connectors === 2) {
    room_number += 1
    number_of_connectors = 0
  }
  socket.join('room' + room_number) /// simple trial of joining room one
  io.to('room' + room_number).emit('connectToRoom', ' Welcome to room number' + room_number)
  number_of_connectors += 1

  // Listerning to player 2 events
  socket.on('playerResponse', (arg) => {
    console.log('room' + ' ' + room_number + arg) // world
  })
})

io.on('disconnect', function (socket) {

  // check for available rooms
})
io.on('playerRespose', function (data) {
  console.log('player respose' + data)
})

server.listen(3000, () => {
  console.log(' server listening on *:3000')
})
