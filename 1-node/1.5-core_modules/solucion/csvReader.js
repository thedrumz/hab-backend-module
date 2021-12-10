const fs = require('fs').promises
const NoFileException = require('./NoFileException')

async function csvReader(file) {
  let data
  try {
    const result = await fs.readFile(file);
    data = result.toString()
  } catch (err) {
    throw new NoFileException(file)
  }

  const arrayLines = data.split('\n')
  const [headerString, ...rows] = arrayLines
  const header = stringSeparateSemicolonToArray(headerString)

  return rows.map(rowString => {
    const row = stringSeparateSemicolonToArray(rowString)
    const parsedRow = {}
    row.forEach((item, index) => parsedRow[header[index]] = item)

    return parsedRow
  })
}

function stringSeparateSemicolonToArray(string) {
  return string.split(';').filter(item => item)
}

module.exports = csvReader