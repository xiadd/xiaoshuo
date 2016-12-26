const crypto = require('crypto')

const config = require('../config')

function getSign (env, query) {
  if (env !== 'production') {
    return config.showapiAppSecret
  }
  let _tmpStr = Object.keys(query).map(v => v + query[v]).sort().join('')
  return crypto.createHash('md5').update(_tmpStr + config.showapiAppSecret).digest('hex')
}

module.exports = getSign
