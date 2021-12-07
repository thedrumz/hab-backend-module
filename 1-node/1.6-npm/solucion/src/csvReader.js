const fs = require('fs')
const csv = require('csv-parser')

async function csvReader({ filePath, fileName }) {
  const results = []
  return new Promise((resolve, reject) => {
    fs.createReadStream(`${filePath}${fileName}.csv`)
    .pipe(csv({ separator: ';' }))
    .on('data', (data) => results.push(data))
    .on('end', () => {
      resolve(results)
    })
  })
}

module.exports = csvReader