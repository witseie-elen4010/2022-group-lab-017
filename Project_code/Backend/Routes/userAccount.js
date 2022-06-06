const path = require('path')
const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userAccount')

router.post('/register', userController.createAccount)
router.post('/signup', userController.login)
router.post('/logout', userController.logout)

module.exports = router
