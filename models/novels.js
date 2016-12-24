const mongoose = require('mongoose')
const Schema = mongoose.Schema

exports.Novel = mongoose.model('Novel', {
  typeName: String,
  id: String,
  author: String,
  updateTime: String,
  name: String,
  type: String,
  newChapter: String,
  size: String, //字数
  chapterList: Array //章节列表 chapterList
})

exports.NovelType = mongoose.model('NovelType', {
  id: String,
  name: String
})

exports.ChapterContent = mongoose.model('ChapterContent', {
  bookId: String,
  cid: String,
  txt: String,//小说内容
})
