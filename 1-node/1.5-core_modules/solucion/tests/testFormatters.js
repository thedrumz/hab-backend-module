const { studentsArrayToText } = require("../formatters")

// Testeamos que el formateador de texto devuelve el formato correcto
function testStudentsArrayToText() {
  const testStudents = [
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
  const expect = `Gómez Parada, Max\n54226765S\nnotable\n\nGraña González, Rebeca\n55443672J\nsobresaliente`

  if (studentsArrayToText(testStudents) !== expect) {
    console.log('testStudentsArrayToText FAILED')
    return
  }

  console.log('testStudentsArrayToText SUCCEDED')
}

testStudentsArrayToText()