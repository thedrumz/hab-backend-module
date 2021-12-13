const { formatStudentName, isDniValid, formatGrade, GRADES } = require("../src/studentBuilder")

describe('StudentBuilder', () => {
  it('should transform fullname to the correct format', () => {
    const studentName = 'Marcos Calvo Castaño'
    const formattedStudentName = 'Calvo Castaño, Marcos'

    expect(formatStudentName(studentName)).toBe(formattedStudentName)
  })
  it('should transform fullname with composed name to the correct format', () => {
    const studentName = 'Ana María Vázquez Soliño'
    const formattedStudentName = 'Vázquez Soliño, Ana María'

    expect(formatStudentName(studentName)).toBe(formattedStudentName)
  })
  it('should return false if the dni is empty or null', () => {
    const studentEmptyDni = ''
    const studentNullDni = null

    expect(isDniValid(studentEmptyDni)).toBe(false)
    expect(isDniValid(studentNullDni)).toBe(false)
  })
  it('should return false if the dni last character is not a letter', () => {
    const studentDni = '12345678'

    expect(isDniValid(studentDni)).toBe(false)
  })
  it('should return false if the dni has less than eight digits', () => {
    const studentDni = '1234567Z'

    expect(isDniValid(studentDni)).toBe(false)
  })
  it('should return false if some of the first characters of the dni are not numeric', () => {
    const studentDni = '123BC678Z'

    expect(isDniValid(studentDni)).toBe(false)
  })
  it('should return true if the dni is valid', () => {
    const studentDni = '12345678Z'

    expect(isDniValid(studentDni)).toBe(true)
  })
  it('should format numeric grade to text', () => {
    const numericGrade = 7
    const textGrade = GRADES.notable

    expect(formatGrade(numericGrade)).toBe(textGrade)
  })
  it('should format numeric with float grade to text', () => {
    const numericGrade = 6.9
    const textGrade = GRADES.aprobado

    expect(formatGrade(numericGrade)).toBe(textGrade)
  })
})