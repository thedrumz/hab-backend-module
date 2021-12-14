const express = require('express')
const usersRepository = require('./inMemoryUsersRepository')

const app = express()

const PORT = 3000

app.listen(PORT, () => {
  console.log(`El servidor está funcionando en http://localhost:${PORT}`)
})
