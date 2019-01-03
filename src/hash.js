const crypto = require('crypto')

module.exports = (input) => {
  const hash = crypto.createHash('md5')
  hash.update(input)
  return hash.digest()
}
