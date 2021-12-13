const GRADES = {
  insuficiente: 'insuficiente',
  aprobado: 'aprobado',
  notable: 'notable',
  sobresaliente: 'sobresaliente'
}

function studentBuilder({ fullname, dni, grade }) {
  // formateamos el nombre del estudiante
  const formattedName = formatStudentName(fullname)
  
  // verificamos si el DNI es válido
  if (!isDniValid(dni)) {
    throw new Error('Invalid DNI')
  }
  
  // formateamos la nota
  const formattedGrade = formatGrade(grade)

  return {
    fullname: formattedName,
    dni,
    grade: formattedGrade
  }
}

function formatStudentName(fullname) {
  const nameParts = fullname.split(' ')
  const [firstSurname, secondSurname] = nameParts.splice(-2)
  const formattedName = `${firstSurname} ${secondSurname}, ${nameParts.join(' ')}`

  return formattedName
}

function isDniValid(dni) {
  // vemos primero que no esté vacío
  if (!dni) return false
  
  // verificamos que el último caracter sea una letra
  const dniLetter = dni.charAt(dni.length - 1)
  if (!dniLetter.match(/[a-z]/i)) return false
  
  // y que el dni comience con 8 caracteres numéricos
  const dniNumbers = dni.slice(0, -1)
  if (dniNumbers.length !== 8 || !Number(dniNumbers)) return false

  return true
}

function formatGrade(grade) {
  let formattedGrade
  switch (true) {
    case grade < 5:
      formattedGrade = GRADES.insuficiente
      break
    case grade >= 5 && grade < 7:
      formattedGrade = GRADES.aprobado
      break
    case grade >= 7 && grade < 9:
      formattedGrade = GRADES.notable
      break
    case grade >= 9:
      formattedGrade = GRADES.sobresaliente
  }

  return formattedGrade
}

module.exports = {
  studentBuilder,
  formatStudentName,
  isDniValid,
  formatGrade,
  GRADES
}
