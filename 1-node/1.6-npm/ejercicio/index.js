const path = require('path')
const studentsBuilder = require('./studentsBuilder')
const { studentsArrayToText } = require('./formatters')
const csvReader = require('./csvReader')
const txtWriter = require('./txtWriter')

csvReader(path.join(__dirname, '../students.csv')).then(students => {
  const formattedStudents = studentsBuilder(students)
  const textStudentsFormat = studentsArrayToText(formattedStudents)

  txtWriter({ file: path.join(__dirname, '../students.txt'), content: textStudentsFormat })
}).catch(error => console.log(error.message))
