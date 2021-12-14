let users = [
  {
    id: 1,
    username: 'user 1',
    email: 'user1@email.com',
    password: 'user1_password'
  },
  {
    id: 2,
    username: 'user 2',
    email: 'user2@email.com',
    password: 'user2_password'
  },
  {
    id: 3,
    username: 'user 3',
    email: 'user3@email.com',
    password: 'user3_password'
  },
  {
    id: 4,
    username: 'user 4',
    email: 'user4@email.com',
    password: 'user4_password'
  }
]

const getUsers = ({ from = 0, limit }) => {
  if (!from && !limit) return users

  return users.slice(from).filter((user, index) => !limit ? true : index < limit)
}

const getUserById = (userId) => {
  return users.find(user => user.id === userId)
}

const saveUser = (user) => {
  const lastId = users[users.length - 1].id
  const newUser = { ...user, id: lastId + 1 }

  users.push(newUser)

  return newUser
}

const editUser = (user) => {
  const userIndex = users.findIndex(userOfUsers => userOfUsers.id === user.id)
  
  users[userIndex] = { ...user }

  return user
}

const removeUser = (userId) => {
  if (!users.find(user => user.id === userId)) return false
  
  users = users.filter(user => user.id !== userId)

  return true
}

module.exports = {
  getUsers,
  getUserById,
  saveUser,
  editUser,
  removeUser
}