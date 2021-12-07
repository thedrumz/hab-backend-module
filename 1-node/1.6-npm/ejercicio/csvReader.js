const fs = require('fs').promises

async function csvReader({ filePath, fileName }) {
  let data
  try {
    const result = await fs.readFile(`${filePath}/${fileName}.csv`);
    data = result.toString()
  } catch (err) {
    console.error(`error reading file ${filePath}/${fileName}.csv`);
    process.exit()
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