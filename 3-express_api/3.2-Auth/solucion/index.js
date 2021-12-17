const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const usersRepository = require('./inMemoryUsersRepository')

const app = express()

const PORT = 3000
const SALT_ROUNDS = 10
const JWT_PRIVATE_KEY = '123abc098zyx'
const JWT_EXPIRES_AFTER = 60 * 60   // 1 hour

app.use(express.json())

// MIDDLEWARES
// ===========

const isAuthorized = (req, res, next) => {
  const bearerToken = req.headers.authorization
  
  if (!bearerToken) {
    res.status(401)
    res.end('You are not authorized to that')
    return
  }

  const token = bearerToken.replace('Bearer ', '')
  let decodedToken
  
  try {
    decodedToken = jwt.verify(token, JWT_PRIVATE_KEY)
  } catch (error) {
    res.status(401)
    res.end('Expired or invalid token')
    return
  }

  req.user = { ...decodedToken.user }

  next()
}

app.get('/users', isAuthorized, (req, res) => {
  const { from, limit } = req.query

  res.status(200)
  res.send(usersRepository.getUsers({ from, limit }))
})

app.get('/users/:userId', isAuthorized, (req, res) => {
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

app.post('/users', isAuthorized, (req, res) => {
  const user = req.body

  if (!user) {
    res.status(400)
    res.end('You should provide a valid user to save')
  } else {
    res.status(200)
    res.send(usersRepository.saveUser(user))
  }
})

app.put('/users', isAuthorized, (req, res) => {
  const user = req.body

  if (!user) {
    res.status(400)
    res.end('You should provide a valid user to save')
  } else {
    res.status(200)
    res.send(usersRepository.editUser(user))
  }
})

app.delete('/users/:userId', isAuthorized, (req, res) => {
  const userId = Number(req.params.userId)

  if (!usersRepository.removeUser(userId)) {
    res.status(404)
    res.end('User not found')
  } else {
    res.status(200)
    res.end()
  }
})

// AUTH endpoints
// ==============

app.post('/auth/register', async (req, res) => {
  const user = req.body

  if (!user.email || !user.password) {
    res.status(400)
    res.end('You should provide an email and password')
    return
  }

  if (usersRepository.userExists(user)) {
    res.status(403)
    res.end('User already exists')
    return
  }

  let encryptedPassword
  try {
    encryptedPassword = await bcrypt.hash(user.password, SALT_ROUNDS)
  } catch (error) {
    res.status(500)
    res.end('Unexpected error')
    return
  }

  const savedUser = usersRepository.saveUser({ ...user, password: encryptedPassword })
  const { password, ...userToReturn } = savedUser
  
  res.status(200)
  res.send(userToReturn)
})

app.post('/auth/login', async (req, res) => {
  const credentials = req.body

  if (!credentials.email || !credentials.password) {
    res.status(400)
    res.end('You should provide an email and password')
    return
  }

  const user = usersRepository.getUserByEmail(credentials.email)

  if (!user) {
    res.status(404)
    res.end('User not found')
    return
  }
  
  if (!await bcrypt.compare(credentials.password, user.password)) {
    res.status(403)
    res.end('Invalid credentials')
    return
  }

  const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + JWT_EXPIRES_AFTER,
    user: { id: user.id }
  }, JWT_PRIVATE_KEY);

  res.status(200)
  res.send({ token })
})

app.listen(PORT, () => {
  console.log(`El servidor está funcionando en http://localhost:${PORT}`)
})
