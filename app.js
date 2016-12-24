const express = require('express')
const session = require('express-session')
const bodyPaser = require('body-parser')
const log4js = require('log4js')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const logger = require('./utils/logger')
const config = require('./config')
//数据库连接
mongoose.connect(config.database)
const app = express()
const PORT = process.env.PORT || 8080

//引入路由
const queryBooksType = require('./controllers/book').queryBooksType
const queryBookContent = require('./controllers/book').queryBookContent
const queryBooks = require('./controllers/book').queryBooks
const queryChapterContent = require('./controllers/book').queryChapterContent

app.use(log4js.connectLogger(logger, { level: log4js.levels.INFO }))

app.get('/api/types', queryBooksType)
app.get('/api/chapters/:bookId', queryBookContent)
app.get('/api/books', queryBooks)
app.get('/api/chapter', queryChapterContent)

app.listen(8080, function () {
  console.log('server is running 8080')
})
