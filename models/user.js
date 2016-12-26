const mongoose = require('mongoose')
const Schema = mongoose.Schema

exports.User = mongoose.model('User', new Schema({
  openid: String,
  nickname: String,
  sex: String,
  province: String,
  city: String,
  country: String,
  headimgurl: String,
  privilege: Array,
  unionid: String,
  code: String,
  book_list: Array,
  have_read: Array
}))
