const { formatStundent } = require('./formatStudent')

const testStudent = {
  fullname: 'Rosa María García Pérez',
  dni: '56743665F',
  grade: 8.5
}

try {
  console.log(formatStundent(testStudent))
} catch (error) {
  console.log(error.message)
}