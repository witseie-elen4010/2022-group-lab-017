// Done Sprint 1
const path = require('path')
const express = require('express')
const mainRouter = express.Router()

mainRouter.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../../index.html'))
})

mainRouter.get('/signup', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'signup.html'))
})

mainRouter.get('/register', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'signup.html'))
})

mainRouter.get('/game', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'game.html'))
})

mainRouter.get('/main_menu', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'main_menu.html'))
})

mainRouter.get('/twoPlayers', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'invite_player.html'))
})

module.exports = mainRouter
