const path = require('path')
const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userAccount.js')

router.post('/register', userController.createAccount)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

module.exports = router
