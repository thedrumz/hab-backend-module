const { studentBuilder } = require('./studentBuilder')

function studentsBuilder(students) {
  const formattedStudents = []

  students.map(student => {
    try {
      formattedStudents.push(studentBuilder(student))
    } catch (error) {
      // nothing to do...
    }
  })

  return formattedStudents
}

module.exports = studentsBuilder
