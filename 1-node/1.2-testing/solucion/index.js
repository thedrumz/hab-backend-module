function formatStundent({ fullname, dni, grade }) {
  // formateamos el nombre del estudiante
  const nameParts = fullname.split(' ')
  const [firstSurname, secondSurname] = nameParts.splice(-2)
  const formattedName = `${firstSurname} ${secondSurname}, ${nameParts.join(' ')}`
  
  // verificamos si el DNI es válido
  // para eso vemos primero que no esté vacío
  if (!dni) throw new Error()
  
  // verificamos que el último caracter sea una letra
  const dniLetter = dni.charAt(dni.length - 1)
  if (!dniLetter.match(/[a-z]/i)) throw new Error()
  
  // y que el dni comience con 8 caracteres numéricos
  const dniNumbers = dni.slice(0, -1)
  if (dniNumbers.length !== 8 || !Number(dniNumbers)) throw new Error()
  
  // formateamos la nota
  let formattedGrade
  switch (true) {
    case grade < 5:
      formattedGrade = 'insuficiente'
      break
    case grade >= 5 && grade < 7:
      formattedGrade = 'aprobado'
      break
    case grade >= 7 && grade < 9:
      formattedGrade = 'notable'
      break
    case grade >= 9:
      formattedGrade = 'sobresaliente'
  }

  return {
    fullname: formattedName,
    dni,
    grade: formattedGrade
  }
}

// Testeamos que el nombre devuelto tenga el formato correcto
function testFormatNameIsCorrect () {
  const testStudent = {
    fullname: 'Marcos Calvo Castaño',
    dni: '12345678A',
    grade: 0
  }
  const expect = 'Calvo Castaño, Marcos'

  const result = formatStundent(testStudent)

  if (result.fullname !== expect) {
    console.log('testFormatNameIsCorrect FAILED')
    return
  }

  console.log('testFormatNameIsCorrect SUCCEDED')
}

// Testeamos que el nombre devuelto tenga el formato correcto cuando el nombre es compuesto
function testFormatNameIsCorrectWhenNameIsComposed () {
  const testStudent = {
    fullname: 'Ana María Vázquez Soliño',
    dni: '12345678A',
    grade: 0
  }
  const expect = 'Vázquez Soliño, Ana María'

  const result = formatStundent(testStudent)

  if (result.fullname !== expect) {
    console.log('testFormatNameIsCorrectWhenNameIsComposed FAILED')
    return
  }

  console.log('testFormatNameIsCorrectWhenNameIsComposed SUCCEDED')
}

// Testeamos que si el DNI está vacío devuelve una excepción
function testEmptyDniThrowsAnException() {
  const testStudent = {
    fullname: 'Ana María Vázquez Soliño',
    dni: '',
    grade: 0
  }

  try {
    formatStundent(testStudent)
  } catch (error) {
    console.log('testEmptyDniThrowsAnException SUCCEDED')
    return
  }

  console.log('testEmptyDniThrowsAnException FAILED')
}

// Testeamos que si el último caracter del DNI no es una letra devuelve una excepción
function testDniLastCharacterIsNotLetterThrowsAnException() {
  const testStudent = {
    fullname: 'Ana María Vázquez Soliño',
    dni: '12345678',
    grade: 0
  }

  try {
    formatStundent(testStudent)
  } catch (error) {
    console.log('testDniLastCharacterIsNotLetterThrowsAnException SUCCEDED')
    return
  }

  console.log('testDniLastCharacterIsNotLetterThrowsAnException FAILED')
}

// Testeamos que si el DNI tiene menos de 8 digitos devuelve una excepción
function testDniLessThanEightDigitsThrowsAnException() {
  const testStudent = {
    fullname: 'Ana María Vázquez Soliño',
    dni: '1234567Z',
    grade: 0
  }

  try {
    formatStundent(testStudent)
  } catch (error) {
    console.log('testDniLessThanEightDigitsThrowsAnException SUCCEDED')
    return
  }

  console.log('testDniLessThanEightDigitsThrowsAnException FAILED')
}

// Testeamos que si los primeros 8 caracteres del DNI no son numéricos devuelve una excepción
function testDniFirstEightCharactersNotNumericThrowsAnException() {
  const testStudent = {
    fullname: 'Ana María Vázquez Soliño',
    dni: '123BC678Z',
    grade: 0
  }

  try {
    formatStundent(testStudent)
  } catch (error) {
    console.log('testDniFirstEightCharactersNotNumericThrowsAnException SUCCEDED')
    return
  }

  console.log('testDniFirstEightCharactersNotNumericThrowsAnException FAILED')
}

// Testeamos que las calificaciones se transforman a texto correctamente
function testGradesFormatToText() {
  const testStudent = {
    fullname: 'Ana María Vázquez Soliño',
    dni: '12345678A',
    grade: 7
  }
  const expect = 'notable'

  const result = formatStundent(testStudent)

  if (result.grade !== expect) {
    console.log('testGradesFormatToText FAILED')
    return
  }

  console.log('testGradesFormatToText SUCCEDED')
}

// Testeamos que las calificaciones se transforman a texto correctamente
function testGradesWithFloatFormatToText() {
  const testStudent = {
    fullname: 'Ana María Vázquez Soliño',
    dni: '12345678A',
    grade: 6.9
  }
  const expect = 'aprobado'

  const result = formatStundent(testStudent)

  if (result.grade !== expect) {
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
