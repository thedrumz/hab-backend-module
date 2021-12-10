const path = require('path')
const studentsBuilder = require('./src/studentsBuilder')
const { studentsArrayToText } = require('./src/formatters')
const csvReader = require('./src/csvReader')
const txtWriter = require('./src/txtWriter')

csvReader(path.join(__dirname, '../students.csv')).then(students => {
  const formattedStudents = studentsBuilder(students)
  const textStudentsFormat = studentsArrayToText(formattedStudents)

  txtWriter({ file: path.join(__dirname, '../students.txt'), content: textStudentsFormat })
}).catch(error => console.log(error.message))