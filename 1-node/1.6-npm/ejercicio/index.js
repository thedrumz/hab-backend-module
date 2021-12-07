const studentsBuilder = require('./studentsBuilder')
const { studentsArrayToText } = require('./formatters')
const csvReader = require('./csvReader')
const txtWriter = require('./txtWriter')

csvReader({ filePath: '../', fileName: 'students'}).then(students => {
  const formattedStudents = studentsBuilder(students)
  const textStudentsFormat = studentsArrayToText(formattedStudents)

  txtWriter({ filePath: './', fileName: 'students', content: textStudentsFormat })
})