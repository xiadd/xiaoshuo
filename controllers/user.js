const User = require('../models/user').User
const qs = require('querystring')
const request = require('axios')
const validator = require('validator')
const config = require('../config')
const Novel = require('../models/novels').Novel

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
    User.findOne({openid: openid}).then(user => {
      req.session.userid = openid
      if (!user) {
        let _user = new User(data)
        _user.save(function (err, _tmp) {
          if (err) throw err
          //do sth with _tmp
        })
      }
      console.log(data)
      //注意这里是跳转到单页应用上了，带上code进行接口校验是否是微信登录
      res.redirect('/#/login?' + qs.stringify(req.query))
    }, err => res.json({code: -1, msg: err.message}))
  })
}

//获取用户信息
exports.getUserInfo = function (req, res) {
  User.findOne({openid: req.session.userid}).then(user => {
    if (user) {
      return res.json({ code: 1, msg: '成功', ret: user })
    }
    return res.json({
      code: -1,
      msg: '不存在该用户'
    })
  }).catch(err => res.json({code: -1, msg: err.message}))
}

//新增书到书单
// `/api/add/:bookId`
exports.addToList = function (req, res) {
  let bookId= req.params.bookId
  let userId = req.session.userid
  Novel.aggregate(
    { $match: { id: bookId } },
    { $project: { _id: 0, id: 1, name: 1, author: 1, updateTime: 1, newChapter: 1, size: 1, typeName: 1 } }
  ).then(function (result) {
    if (result.length !== 0) {
      return result[0]
    }
    res.json({ code: -1, msg: '该小说暂未收录，请向管理员反馈添加' })
    return null
  }).catch(function (err) {
    res.json({ code: -1, msg: err.message })
  }).then(function (result) {
    if (result) {
      return User.findOne({openid: userId}).then(function (user) {
        let isExisted = user.book_list.every(v => v.id !== result.id)
        if (!isExisted) {
          return res.json({ code: -1, msg: '该小说已经在书单' })
        }
        user.book_list.push(result)
        user.save().then(_r => res.json({ code: 1, msg: '添加成功' }))
          .catch(err => res.json({ code: -1, msg: err.message }))
      })
    }
  }).catch(err => console.log(err))
  // User.findOneAndUpdate({openid: userId}).then(function (user) {
  //
  // })
}

//从书单删除
// `/api/remove/:bookId`
exports.removeFromList = function (req, res) {
  let bookId = req.params.bookId
  let userId = req.session.userid
  User.findOne({ openid: userId }).then(function (user) {
    let bookList = user.book_list
    let _idx = bookList.filter(v => v.id === bookId)
    if (_idx.length === 0) {
      return res.status(403).json({ code: -1, msg: '不存在该书' })
    }
    user.book_list.splice(bookList.indexOf(_idx[0]), 1)
    user.save().then(function (_tmp) {
      res.json({ code: 1, msg: '删除成功' })
    }).catch(err => res.json({code: -1, msg: err.message}))
  })
}

//开始阅读
exports.read = function (req, res) {
  
}

//已经读到的章节
exports.inReading = function (req, res) {
  
}