const express = require('express')
const session = require('express-session')
const bodyPaser = require('body-parser')
const log4js = require('log4js')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const routes = require('./routers')

const logger = require('./utils/logger')
const config = require('./config')
//数据库连接
mongoose.connect(config.database)
const app = express()

app.use(log4js.connectLogger(logger, { level: log4js.levels.INFO }))

app.use('/api', routes)
module.exports = app
