const express = require('express')
const session = require('express-session')
const bodyPaser = require('body-parser')
const log4js = require('log4js')
const mongoose = require('mongoose')
const RedisStore = require('connect-redis')(session)
mongoose.Promise = global.Promise
const routes = require('./routers')

const logger = require('./utils/logger')
const config = require('./config')
//数据库连接
mongoose.connect(config.database)
const app = express()
app.set('trust proxy', 1)
app.use(session({
  store: new RedisStore({ host: '127.0.0.1', port: '6379' }),
  secret: 'xiadd',
  resave: false,
  saveUninitialized: false,
  name: 'ywid'
}))
//app.use(log4js.connectLogger(logger, { level: log4js.levels.ERROR }))

app.use('/api', routes)
app.get('/', function (req, res) {
  console.log(req.session.userid);
  res.send('xiadd')
})
module.exports = app
