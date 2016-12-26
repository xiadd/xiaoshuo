const User = require('../models/user').User
const qs = require('querystring')
const request = require('axios')
const validator = require('validator')
const config = require('../config')

//包括新用户和旧用户
//https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1ce65521ad23e942&redirect_uri=http://wechat.xiadd.me/api/wechat/login&response_type=code&scope=snsapi_userinfo&state=home#wechat_redirect
exports.wxLogin = function (req, res) {
  let code =req.query.code
  if (!code) {
    return res.json({
      code: -1,
      msg: '该接口是微信回调打开，否则无效'
    })
  }
  let getTokenUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.wxAppId}&secret=${config.wxAppSecret}&code=${code}&grant_type=authorization_code `
  request.get(getTokenUrl).then(result => {
    let data = result.data
    let openid = data.openid
    let token = data.access_token
    if (openid && token) {
      let getUserUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${token}&openid=${openid}&lang=zh_CN`
      return request.get(getUserUrl)
    }
  }).then(result => {
    let data = result.data
    let openid = data.openid
    req.session.userid = openid
    console.log(req.session)
    User.findOne({openid: openid}).then(user => {
      console.log(user);
    }, err => res.json({code: -1, msg: err.message}))
  })
  res.redirect('/#/login?' + qs.stringify(req.query))
}
