const http = require('http')
const express = require('express')

const app = express()
const server = http.createServer(app)

server, listen(3000, () => {
  console.log('running on 3000')
})

/*
const server = app.listen(port, () => {
    console.log('Listening on port: ' + port)
  })
  const io = require('socket.io')(server)

  io.sockets.on('new Connection', newConnection)
  function newConnection (socket) {
    console.log(io)
  }
  newConnection(io) */
