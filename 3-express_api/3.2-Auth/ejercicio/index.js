const express = require('express')
const usersRepository = require('./inMemoryUsersRepository')

const app = express()

const PORT = 3000

app.use(express.json())

app.get('/users', async (req, res) => {
  const { from, limit } = req.query

  res.status(200)
  res.send(usersRepository.getUsers({ from, limit }))
})

app.get('/users/:userId', async (req, res) => {
  const userId = Number(req.params.userId)
  const user = usersRepository.getUserById(userId)

  if (!user) {
    res.status(404)
    res.end('User not found')
  } else {
    res.status(200)
    res.send(user)
  }
})

app.post('/users', async (req, res) => {
  const user = req.body

  if (!user) {
    res.status(400)
    res.end('You should provide a valid user to save')
  } else {
    res.status(200)
    res.send(usersRepository.saveUser(user))
  }
})

app.put('/users', async (req, res) => {
  const user = req.body

  if (!user) {
    res.status(400)
    res.end('You should provide a valid user to save')
  } else {
    res.status(200)
    res.send(usersRepository.editUser(user))
  }
})

app.delete('/users/:userId', async (req, res) => {
  const userId = Number(req.params.userId)

  if (!usersRepository.removeUser(userId)) {
    res.status(404)
    res.end('User not found')
  } else {
    res.status(200)
    res.end()
  }
})

app.listen(PORT, () => {
  console.log(`El servidor está funcionando en http://localhost:${PORT}`)
})
