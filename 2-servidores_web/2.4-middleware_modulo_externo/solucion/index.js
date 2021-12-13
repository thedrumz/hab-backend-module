const path = require('path')
const express = require('express')
const morgan = require('morgan')
const studentsBuilder = require('./src/studentsBuilder')
const { studentsArrayToText } = require('./src/formatters')
const csvReader = require('./src/csvReader')

// Creamos un servidor HTTP.
const app = express()

// Definimos el puerto.
const PORT = 3000

// Middleware para loggear las peticiones. Con la configuración 'dev' podemos ver
// como en la consola se va creando un log de las peticiones y códigos de respuesta
// https://www.npmjs.com/package/morgan
app.use(morgan('dev'));

// Middleware de autorización
app.use((req, res, next) => {
  if (req.headers.authorization === 'mi_clave_secreta') {
    next()
  } else {
    res.status(401)
    res.send('You are not authorized!')
  }
})

// Configuramos una función que se ejecutará cuando al servidor le llegue una petición.
app.get('/', async (req, res, next) => {

  // Leemos el json de estudiantes
  let students
  try {
    students = await csvReader(path.join(__dirname, '../students.csv'))
  } catch (error) {
    res.statusCode = 405
    res.end()
    return
  }
  // Formateamos los datos
  const formattedStudents = studentsBuilder(students)
  const textStudentsFormat = studentsArrayToText(formattedStudents)

  // Creamos la respuesta
  res.status(200)
  res.setHeader('Content-type', 'text/plain')
  res.end(textStudentsFormat)
})

// Ponemos el servidor a escuchar peticiones en el puerto 3000.
app.listen(PORT, () => {
  console.log(`El servidor está funcionando en http://localhost:${PORT}`)
})
