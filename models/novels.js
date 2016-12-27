const mongoose = require('mongoose')
const Schema = mongoose.Schema

exports.Novel = mongoose.model('Novel', new Schema({
  typeName: String,
  id: String,
  author: String,
  updateTime: String,
  name: String,
  type: String,
  newChapter: String,
  size: String, //字数
  chapterList: Array, //章节列表 chapterList
  in_list: { type: Boolean, default: false }
}))

exports.NovelType = mongoose.model('NovelType', new Schema({
  id: String,
  name: String
}))

exports.ChapterContent = mongoose.model('ChapterContent', new Schema({
  bookId: String,
  cid: String,
  txt: String,//小说内容
}))
