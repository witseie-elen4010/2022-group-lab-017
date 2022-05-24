
const mainRouter = require('./Project_code/Backend/mainRoutes')
// const path = require('path')
const express = require('express')
const app = express()

app.use('/static', express.static('Project_code'))
app.use(mainRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
