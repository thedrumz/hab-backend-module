function studentsArrayToText(students) {
  const formattedStudents = students.map(student => {
    return `${student.fullname}\n${student.dni}\n${student.grade}`
  })

  return formattedStudents.join('\n\n')
}

module.exports = {
  studentsArrayToText
}