const { formatStundent } = require('./formatStudent')

function formatMultipleStudents(students) {
  const formattedStudents = []

  students.map(student => {
  try {
    formattedStudents.push(formatStundent(student))
  } catch (error) {
      console.log(error.message)
    }
  })

  return formattedStudents
}

function testFormatMultipleStudents() {
  const testStudents = [
    {
      fullname: 'Max Gómez Parada',
      dni: '54226765S',
      grade: 7.5
    },
    {
      fullname: 'Rebeca Graña González',
      dni: '55443672J',
      grade: 10
    }
  ]

  const expect = [
    {
      fullname: 'Gómez Parada, Max',
      dni: '54226765S',
      grade: 'notable'
    },
    {
      fullname: 'Graña González, Rebeca',
      dni: '55443672J',
      grade: 'sobresaliente'
    }
  ]

  const result = formatMultipleStudents(testStudents)

  if (result[0].fullname !== expect[0].fullname ||
    result[0].dni !== expect[0].dni ||
    result[0].grade !== expect[0].grade ||
    result[1].fullname !== expect[1].fullname ||
    result[1].dni !== expect[1].dni ||
    result[1].grade !== expect[1].grade) {
      console.log('testFormatMultipleStudents: FAILED')
      return
    }

  console.log('testFormatMultipleStudents: SUCCEDED')
}

testFormatMultipleStudents()