const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, { /* options */ })
app.use('/static', express.static('Project_code'))

io.on('connection', (socket) => {
  // ...
  console.log('new connector')
})

io.on('connection', (socket) => {
  socket.on('hello', (arg) => {
    console.log(arg) // world
  })
})
