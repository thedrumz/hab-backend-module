const { studentsArrayToText } = require("../src/formatters")

describe('Formatters', () => {
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
  describe('StudentsArrayToText', () => {
    it('should transform students array to the correct text format', () => {
      const textStudents = `Gómez Parada, Max\n54226765S\nnotable\n\nGraña González, Rebeca\n55443672J\nsobresaliente`

      expect(studentsArrayToText(testStudents)).toBe(textStudents)
    })
  })
})