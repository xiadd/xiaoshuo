const log4js = require('log4js')
const env = process.env.NODE_ENV //不存在没设置环境的情况

log4js.configure({
  appenders: [
    { type: 'console' },
    { type: 'DateFile', filename: 'logs/error.log', pattern: '-yyyy-MM-dd.log', alwaysIncludePattern: true, category: 'access' }
  ]
})

const logger = log4js.getLogger('error')

module.exports = logger
