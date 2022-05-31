// Done Sprint 1
const path = require('path')
const express = require('express')
const mainRouter = express.Router()

mainRouter.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../../../index.html'))
})

mainRouter.get('/signup', function (req, res) {
  res.sendFile(path.join(__dirname, '../../views', 'signup.html'))
})

mainRouter.get('/game', function (req, res) {
  res.sendFile(path.join(__dirname, '../../views', 'game.html'))
})

mainRouter.get('/game2', function (req, res) {
  res.sendFile(path.join(__dirname, '../../views', 'game_2.html'))
})

mainRouter.get('/main_menu', function (req, res) {
  res.sendFile(path.join(__dirname, '../../views', 'main_menu.html'))
})

mainRouter.get('/inviteTwoPlayers', function (req, res) {
  res.sendFile(path.join(__dirname, '../../views', 'invite_two_players.html'))
})

mainRouter.get('/invitePlayer', function (req, res) {
  res.sendFile(path.join(__dirname, '../../views', 'invite_player.html'))
})

module.exports = mainRouter
