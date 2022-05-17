const mainRouter = require('./Project_code/Backend/mainRoutes')
const path = require('path') 
const express = require('express')
const app = express()

app.use('/static', express.static('Project_code'))
app.use(mainRouter);

const port = process.env.PORT || 3000
app.listen(port)
console.log("Listening on port: ", port);