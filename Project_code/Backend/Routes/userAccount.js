const path = require('path')
const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userAccount')
const db = require('../Configs/db')
const bcrypt = require('bcryptjs')

router.post('/register', (req,res) =>{
    const user = {
        User_Name: req.body.user_name,
        User_Email: req.body.user_email,
        User_Password: req.body.user_password,
        confirmPassword: req.body.user_password_confirm
      }
      bcrypt.hash(user.User_Password, 10).then(function (hash) {
        user.User_Password = hash
              db.pools
                .then((pool) => {
                  return pool.request()
                    .input('Username', db.sql.Char, user.User_Name)
                    .input('Email', db.sql.Char, user.User_Email)
                    .input('UserPassword', db.sql.Char, hash)
                    .query('INSERT INTO Users (Username, Email, User_Password) VALUES (@Username, @Email, @UserPassword)')
                })
                .then(result => {
                  console.log('User Created Successfully')
                  //res.redirect('/')
                })

            })
    res.redirect('/')
})

//userController.createAccount);
//router.post('/login', userController.login);
//router.post('/logout', userController.logout);

module.exports = router