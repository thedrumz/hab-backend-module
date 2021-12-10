const fs = require('fs')
const csv = require('csv-parser')
const NoFileException = require('./NoFileException')

async function csvReader(file) {
  const results = []
  return new Promise((resolve, reject) => {
    fs.createReadStream(file)
    .on('error', () => reject())
    .pipe(csv({ separator: ';' }))
    .on('data', (data) => results.push(data))
    .on('end', () => {
      resolve(results)
    })
  }).catch(() => { throw new NoFileException(file) })
}

module.exports = csvReader