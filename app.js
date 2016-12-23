const express = require('express')
const log4js = require('log4js')

log4js.configure({
  appenders: [
    { type: 'console' }, //控制台输出
    {
      type: 'file', //文件输出
      filename: 'logs/access.log',
      maxLogSize: 1024,
      backups:3,
      category: 'normal'
    }
  ]
})
const logger = log4js.getLogger('normal')
logger.setLevel('INFO')

const app = express()

app.use(log4js.connectLogger(logger, {level:log4js.levels.INFO}))

app.get('/', function (req, res) {
  logger.trace('Entering cheese testing')
  res.json({
    name: 1
  })
})

app.listen(8080, () => console.log('server is rnning'))
