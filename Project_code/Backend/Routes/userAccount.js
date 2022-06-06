const path = require('path')
const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userAccount.js')

router.post('/signup', userController.createAccount)
router.post('/', userController.login)
router.post('/logout', userController.logout)

module.exports = router
