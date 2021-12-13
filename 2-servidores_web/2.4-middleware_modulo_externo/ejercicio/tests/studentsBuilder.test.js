const studentsBuilder = require("../src/studentsBuilder")

describe('StudentsBuilder', () => {
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

  it('should transform students array to the correct format', () => {
    const formattedStudents = [
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

    expect(studentsBuilder(testStudents)).toEqual(formattedStudents)
  })
})