
const mainRouter = require('./Project_code/Backend/mainRoutes')
// const path = require('path')
const express = require('express')
const app = express()

app.use('/static', express.static('Project_code'))
app.use(mainRouter)

/// seting up the sockets.io

const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(5000, () => {
  console.log('listening on *:3000')
})
