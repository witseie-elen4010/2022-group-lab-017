const db = require('../Configs/db')
const bcrypt = require('bcryptjs')
//const WORDS = require('../../public/scripts/words.js')


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
  //populateWordDatabase()
    const user = {
      userName: req.body.user_email,
      password: req.body.user_password
    }
    db.pools
      .then((pool) => {
        return pool.request()
          // Check if username entered exists in the database
          .input('userEmail', db.sql.Char, user.userName)
          .query('SELECT * FROM Users WHERE Email = @userEmail')
      })
      .then(result => {
        console.log(result)
        if (result.recordset.length === 0) {
          const alert = 'Username entered does not exist'
          console.log("User does not exist")
          res.redirect('/')
        } else {
          db.pools
            .then((pool) => {
              return pool.request()
                // Extract database password to compare with login password
                .input('userEmail', db.sql.Char, user.userName)
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
                      const userID = result.recordset[0].Personid.toString()
                      const userIdName = userID + user.userName
                      const randomCharacter = 'qwerty'
                      res.cookie('user', { username: user.userName, userId: userID }, {
                         maxAge: 60000 * 60 * 24, // cookie duration is one day
                         httpOnly: false,
                         secure: false
                    })
                      console.log('login successfull')
                      res.redirect('/main_menu')
                      db.pools
                      .then((pool) => {
                        const online_status = 'Online'
                        return pool.request()
                          .input('Online_Status', db.sql.Char, online_status)
                          .input('userEmail', db.sql.Char, user.userName)
                          .query('UPDATE Users SET Online_Status = @Online_Status WHERE Email = @userEmail')
                      })
                    }
                })
            })
        }
  })
}

exports.logout = (req, res, next) => {
  const userID = req.cookies.user.userId
  db.pools
  .then((pool) => {
    const online_status = 'Offline'
    return pool.request()
      .input('Online_Status', db.sql.Char, online_status)
      .input('User_Id', db.sql.Char, userID)
      .query('UPDATE Users SET Online_Status = @Online_Status WHERE Personid = @User_Id')
  })

  res.clearCookie('user')
  res.redirect('/')
}

/*function populateWordDatabase(){
  for(let i = 0; i < WORDS.length();i++ )
  {
    let word = WORDS[i];
    db.pools
            .then((pool) => {
              return pool.request()
                .input('word', db.sql.Char, word)
                .query('INSERT INTO Words (Word) VALUES (@word)')
            })
  }
}*/