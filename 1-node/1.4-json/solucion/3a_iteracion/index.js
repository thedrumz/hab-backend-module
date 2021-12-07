const studentsBuilder = require('./studentsBuilder')
const data = require('../../students.json')

try {
  console.log(studentsBuilder(data.students))
} catch (error) {
  console.log(error.message)
}