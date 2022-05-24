const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, { /* options */ })

io.on('connection', (socket) => {
  // ...
  console.log('new connector')
})

httpServer.listen(3500)
