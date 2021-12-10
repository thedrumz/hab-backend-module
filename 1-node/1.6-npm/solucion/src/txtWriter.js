const fs = require('fs').promises

async function txtWriter({ file, content }) {
  fs.writeFile(file, content);
}

module.exports = txtWriter