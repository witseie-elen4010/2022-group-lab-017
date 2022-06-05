// Done Sprint 1
const path = require('path')
const express = require('express')
const mainRouter = express.Router()
const db = require('../Configs/db')

function checkCookie (req, res, next) {
  if (req.cookies.user) {
    next()
  } else {
    res.redirect('/')
  }
}

mainRouter.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../../../index.html'))
})

mainRouter.get('/signup', function (req, res) {
  res.sendFile(path.join(__dirname, '../../views', 'signup.html'))
})

mainRouter.get('/game', checkCookie,function (req, res) {
  res.sendFile(path.join(__dirname, '../../views', 'game.html'))
})

mainRouter.get('/game2', checkCookie,function (req, res) {
  res.sendFile(path.join(__dirname, '../../views', 'game_2.html'))
})

mainRouter.get('/main_menu', checkCookie,function (req, res) {
  res.sendFile(path.join(__dirname, '../../views', 'main_menu.html'))
})

mainRouter.get('/game3', checkCookie,function (req, res) {
  res.sendFile(path.join(__dirname, '../../views', 'game_3.html'))
})

mainRouter.get('/invitePlayer', checkCookie,function (req, res) {
  res.sendFile(path.join(__dirname, '../../views', 'invite_player.html'))
})

module.exports = mainRouter
