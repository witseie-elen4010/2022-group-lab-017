
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

server.listen(3000, () => {
  console.log('listening on *:3000')
})
io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }) // This will emit the event to all connected sockets
