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

module.exports = mainRouter