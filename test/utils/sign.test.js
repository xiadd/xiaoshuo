var sign = require('../../utils/api_sign')
var expect = require('chai').expect
var config = require('../../config')
var crypto = require('crypto')

function getParams (query) {
  if (typeof query !== 'object') throw new Error('传入正确的类型')
  query.showapi_appid = config.showapiAppId
  let showapiSign = sign(env, query)

  query.showapi_sign = showapiSign
  return query
}

describe('签名测试', function () {
  it('dev环境下签名测试', function () {
    let env = 'development'
    let _sign = sign(env, {})
    expect(_sign).to.equal(config.showapiAppSecret)
  })

  it('prod环境下签名测试', function () {
    let env = 'production'
    let showapiSign = sign(env, {showapi_appid: config.showapiAppId})
    let _tmpStr = `showapi_appid${config.showapiAppId}`
    let _sign = crypto.createHash('md5').update(_tmpStr + config.showapiAppSecret).digest('hex')
    expect(showapiSign).to.equal(_sign)
  })
})
