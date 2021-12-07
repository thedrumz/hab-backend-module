const fs = require('fs').promises

async function txtWriter({ filePath, fileName, content }) {
  try {
    await fs.writeFile(`${filePath}/${fileName}.txt`, content);
  } catch (err) {
    console.error(err);
  }
}

module.exports = txtWriter