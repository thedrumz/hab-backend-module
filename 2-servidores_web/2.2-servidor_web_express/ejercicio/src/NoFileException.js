class NoFileException extends Error {
  constructor(file) {
    super(`error reading file ${file}`)
    this.name = 'NoFileException'
  }
}

module.exports = NoFileException