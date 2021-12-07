const GRADES = {
  insuficiente: 'insuficiente',
  aprobado: 'aprobado',
  notable: 'notable',
  sobresaliente: 'sobresaliente'
}

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

  return {
    fullname: formattedName,
    dni,
    grade: formattedGrade
  }
}

module.exports = {
  formatStundent,
  GRADES
}
