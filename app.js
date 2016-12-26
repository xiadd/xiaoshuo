const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const log4js = require('log4js')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
mongoose.Promise = global.Promise
const routes = require('./routes')

const logger = require('./utils/logger')
const config = require('./config')
//数据库连接
mongoose.connect(config.database)
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  secret: 'xiadd',
  resave: false,
  saveUninitialized: true,
  name: 'yw.id'
}))
//app.use(log4js.connectLogger(logger, { level: log4js.levels.ERROR }))

app.use('/api', routes)
app.get('/', function (req, res) {
  res.send('xiadd')
})
module.exports = app
