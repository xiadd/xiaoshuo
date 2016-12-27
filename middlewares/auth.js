const mongoose = require('mongoose')
const User = require('../models/user').User

exports.loginRequired = function (req, res, next) {
  if (!req.session.userid) {
    return res.status(403).json({ code: -1, msg: '用户未登录' })
  }
  next()
}