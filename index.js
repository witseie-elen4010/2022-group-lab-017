
const mainRouter = require('./Project_code/Backend/mainRoutes')
// const path = require('path')
const express = require('express')
const app = express()

app.use('/static', express.static('Project_code'))
app.use(mainRouter)
// app.use('/static', socket.static(sever))

const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
const room_number = 1
io.on('connection', function (socket) {
  socket.join('room' + room_number) /// simple trial of joining room one
  io.sockets.in('room' + room_number).emit('connectToRoom', ' Welcome to room number' + room_number)
})

server.listen(3000, () => {
  console.log(' server listening on *:3000')
})
io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }) // This will emit the event to all connected sockets
