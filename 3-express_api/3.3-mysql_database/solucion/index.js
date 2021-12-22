const crypto = require("crypto")
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const emailSender = require('./emailSender')
// const usersRepository = require('./repository/inMemoryUsersRepository')
const usersRepository = require('./repository/mysql/mysqlUsersRepository')

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

app.get('/users', isAuthorized, async (req, res) => {
  const { from, limit } = req.query

  let users
  try {
    users = await usersRepository.getUsers({ from: Number(from), limit: Number(limit) })
  } catch (error) {
    res.status(500)
    res.end('Database error')
    return
  }

  res.status(200)
  res.send(users)
})

app.get('/users/:userId', isAuthorized, async (req, res) => {
  const userId = Number(req.params.userId)

  let user
  try {
    user = await usersRepository.getUserById(userId)
  } catch (error) {
    res.status(500)
    res.end('Database error')
    return
  }

  if (!user) {
    res.status(404)
    res.end('User not found')
    return
  }

  res.status(200)
  res.send(user)
})

app.post('/users', isAuthorized, async (req, res) => {
  const user = req.body

  if (!user) {
    res.status(400)
    res.end('You should provide a valid user to save')
    return
  }

  let savedUser
  try {
    savedUser = await usersRepository.saveUser(user)
  } catch (error) {
    res.status(500)
    res.end('Database error')
    return
  }

  res.status(200)
  res.send(savedUser)
})

app.put('/users/:userId', isAuthorized, async (req, res) => {
  const user = req.body
  const userId = req.params.userId

  if (!user) {
    res.status(400)
    res.end('You should provide a valid user to save')
    return
  }

  let editedUser
  try {
    editedUser = await usersRepository.editUser({ user, userId })
  } catch (error) {
    res.status(500)
    res.end('Database error')
    return
  }

  res.status(200)
  res.send(editedUser)
})

app.delete('/users/:userId', isAuthorized, async (req, res) => {
  const userId = Number(req.params.userId)

  let isUserRemoved
  try {
    isUserRemoved = await usersRepository.removeUser(userId)
  } catch (error) {
    res.status(500)
    res.end('Database error')
    return
  }

  if (!isUserRemoved) {
    res.status(404)
    res.end('User not found')
    return
  }

  res.status(200)
  res.end()
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

  let userExists
  try {
    userExists = await usersRepository.userExists(user)
  } catch (error) {
    res.status(500)
    res.end('Database error')
    return
  }

  if (userExists) {
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

  const registrationCode = crypto.randomBytes(40).toString('hex')
  let savedUser
  try {
    savedUser = await usersRepository.saveUser({ ...user, password: encryptedPassword, registrationCode })
  } catch (error) {
    res.status(500)
    res.end('Database error')
    return
  }

  emailSender.accountConfirmationEmail({ sendTo: savedUser.email, code: registrationCode })

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

  let user
  try {
    user = await usersRepository.getUserByEmail(credentials.email)
  } catch (error) {
    res.status(500)
    res.end('Database error')
    return
  }

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

app.get('/auth/confirm', async (req, res, next) => {
  const { code } = req.query

  if (!code) {
    res.status(400)
    res.end('No registration code')
    return
  }

  try {
    await usersRepository.confirmAccount(code)
  } catch (error) {
    res.status(400)
    res.end('Invalid registration code')
    return
  }

  res.status(200)
  res.end('Account verifyed')
  next()
})

app.listen(PORT, () => {
  console.log(`El servidor está funcionando en http://localhost:${PORT}`)
})
