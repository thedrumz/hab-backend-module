const http = require('http')
const path = require('path')
const studentsBuilder = require('./src/studentsBuilder')
const { studentsArrayToText } = require('./src/formatters')
const csvReader = require('./src/csvReader')

// Creamos un servidor HTTP.
const app = http.createServer()

// Definimos el puerto.
const PORT = 3000

// Configuramos una función que se ejecutará cuando al servidor le llegue una petición.
app.on('request', async (req, res) => {

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
  res.statusCode = 200
  res.setHeader('Content-type', 'text/plain')
  res.end(textStudentsFormat)
})

// Ponemos el servidor a escuchar peticiones en el puerto 3000.
app.listen(PORT, () => {
  console.log(`El servidor está funcionando en http://localhost:${PORT}`)
})
