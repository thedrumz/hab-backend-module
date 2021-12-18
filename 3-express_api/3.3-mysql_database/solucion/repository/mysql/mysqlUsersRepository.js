const connection = require('./mysqlConnection')

const getUsers = async ({ from = 0, limit }) => {
  let query = "SELECT * FROM users"
  const params = []

  if (limit) {
    query += ' LIMIT ?'
    params.push(limit)
  }

  if (from) {
    query += ' OFFSET ?'
    params.push(from - 1) 
  }

  const result = await connection.query(query, params)

  return result[0]
}

const getUserById = async (userId) => {
  const result = await connection.query("SELECT * FROM users WHERE id = ?", [userId])

  return result[0]
}

const saveUser = async (user) => {
  const result = await connection.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [user.username, user.email, user.password])

  return { ...user, id: result[0].insertId }
}

const editUser = async ({ user, userId}) => {
  await connection.query("UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?", [user.username, user.email, user.password, userId])

  return { ...user, id: userId }
}

const removeUser = async (userId) => {
  const result = await connection.query("DELETE FROM users WHERE id = ?", [userId])

  return !!result[0].affectedRows
}

const userExists = async (user) => {
  const result = await connection.query("SELECT * FROM users WHERE email = ?", [user.email])

  return !!result[0].length
}

const getUserByEmail = async (userEmail) => {
  const result = await connection.query("SELECT * FROM users WHERE email = ?", [userEmail])

  return result[0] && result[0][0]
}

module.exports = {
  getUsers,
  getUserById,
  saveUser,
  editUser,
  removeUser,
  userExists,
  getUserByEmail
}