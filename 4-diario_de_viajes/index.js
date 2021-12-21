const express = require('express')
require('dotenv').config()

const app = express()

const { BASE_URL, PORT } = process.env

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(PORT, () => {
  console.log(`Server is running on ${BASE_URL}:${PORT}`)
})