const { formatStudentName, isDniValid, formatGrade, GRADES } = require('./formatStudent')

// Testeamos que el nombre devuelto tenga el formato correcto
function testFormatNameIsCorrect () {
  const testStudentName = 'Marcos Calvo Castaño'
  const expect = 'Calvo Castaño, Marcos'

  if (formatStudentName(testStudentName) !== expect) {
    console.log('testFormatNameIsCorrect FAILED')
    return
  }

  console.log('testFormatNameIsCorrect SUCCEDED')
}

// Testeamos que el nombre devuelto tenga el formato correcto cuando el nombre es compuesto
function testFormatNameIsCorrectWhenNameIsComposed () {
  const testStudentName = 'Ana María Vázquez Soliño'
  const expect = 'Vázquez Soliño, Ana María'

  if (formatStudentName(testStudentName) !== expect) {
    console.log('testFormatNameIsCorrectWhenNameIsComposed FAILED')
    return
  }

  console.log('testFormatNameIsCorrectWhenNameIsComposed SUCCEDED')
}

// Testeamos que si el DNI está vacío devuelve una excepción
function testEmptyDniThrowsAnException() {
  const testDni = ''

  if (!isDniValid(testDni)) {
    console.log('testEmptyDniThrowsAnException SUCCEDED')
  } else {
    console.log('testEmptyDniThrowsAnException FAILED')
  }
}

// Testeamos que si el último caracter del DNI no es una letra devuelve una excepción
function testDniLastCharacterIsNotLetterThrowsAnException() {
  const testDni = '12345678'

  if (!isDniValid(testDni)) {
    console.log('testDniLastCharacterIsNotLetterThrowsAnException SUCCEDED')
  } else {
    console.log('testDniLastCharacterIsNotLetterThrowsAnException FAILED')
  }
}

// Testeamos que si el DNI tiene menos de 8 digitos devuelve una excepción
function testDniLessThanEightDigitsThrowsAnException() {
  const testDni = '1234567Z'

  if (!isDniValid(testDni)) {
    console.log('testDniLessThanEightDigitsThrowsAnException SUCCEDED')
  } else {
    console.log('testDniLessThanEightDigitsThrowsAnException FAILED')
  }
}

// Testeamos que si los primeros 8 caracteres del DNI no son numéricos devuelve una excepción
function testDniFirstEightCharactersNotNumericThrowsAnException() {
  const testDni = '123BC678Z'

  if (!isDniValid(testDni)) {
    console.log('testDniFirstEightCharactersNotNumericThrowsAnException SUCCEDED')
  } else {
    console.log('testDniFirstEightCharactersNotNumericThrowsAnException FAILED')
  }
}

// Testeamos que las calificaciones se transforman a texto correctamente
function testGradesFormatToText() {
  const testSGrade = 7
  const expect = GRADES.notable

  if (formatGrade(testSGrade) !== expect) {
    console.log('testGradesFormatToText FAILED')
    return
  }

  console.log('testGradesFormatToText SUCCEDED')
}

// Testeamos que las calificaciones se transforman a texto correctamente
function testGradesWithFloatFormatToText() {
  const testGrade = 6.9
  const expect = GRADES.aprobado

  if (formatGrade(testGrade) !== expect) {
    console.log('testGradesWithFloatFormatToText FAILED')
    return
  }

  console.log('testGradesWithFloatFormatToText SUCCEDED')
}

// Tests para el nombre
testFormatNameIsCorrect()
testFormatNameIsCorrectWhenNameIsComposed()

// Tests para el DNI 
testEmptyDniThrowsAnException()
testDniLastCharacterIsNotLetterThrowsAnException()
testDniLessThanEightDigitsThrowsAnException()
testDniFirstEightCharactersNotNumericThrowsAnException()

// Test para las calificaciones
testGradesFormatToText()
testGradesWithFloatFormatToText()