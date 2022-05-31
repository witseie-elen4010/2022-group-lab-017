const db = require('../Configs/db')
const bcrypt = require('bcryptjs')


exports.createAccount = (req, res, next) => {
    console.log('Creating Account')
    const user = {
        User_Name: req.body.user_name,
        User_Email: req.body.user_email,
        User_Password: req.body.user_password,
        confirmPassword: req.body.user_password_confirm
      }
       // Hash user password using 10 rounds of hash algorithm
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
                  res.redirect('/')
                })

            })
}

exports.login = (req, res, next) => {
    const user = {
      userName: req.body.user_email,
      password: req.body.user_password
    }
    db.pools
      .then((pool) => {
        return pool.request()
          // Check if username entered exists in the database
          .input('userEmail', db.sql.Char, user.user_email)
          .query('SELECT * FROM Users WHERE Email = @userEmail')
      })
      .then(result => {
        if (result.recordset.length === 0) {
          const alert = 'Username entered does not exist'
          console.log("User does not exist")
        } else {
          db.pools
            .then((pool) => {
              return pool.request()
                // Extract database password to compare with login password
                .input('userEmail', db.sql.Char, user.user_email)
                .query('SELECT * FROM Users WHERE Email = @userEmail')
            })
            .then(result => {
              let userPassword = result.recordset[0].User_Password
              userPassword = userPassword.split(' ').join('')
              // Compare login hashed password with database hashed password
              bcrypt.compare(user.password, userPassword).then(function (bcryptResult){
                if (!bcryptResult) {
                  const alert = 'Username entered does not exist'
                  console.log(alert)
                } else {
                      console.log('login successfull')
                      res.redirect('/game')
                    }
                })
            })
        }
  })
}