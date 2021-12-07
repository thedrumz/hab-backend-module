const studentsBuilder = require('./src/studentsBuilder')
const { studentsArrayToText } = require('./src/formatters')
const csvReader = require('./src/csvReader')
const txtWriter = require('./src/txtWriter')

csvReader({ filePath: '../', fileName: 'students'}).then(students => {
  const formattedStudents = studentsBuilder(students)
  const textStudentsFormat = studentsArrayToText(formattedStudents)

  txtWriter({ filePath: './', fileName: 'students', content: textStudentsFormat })
})