const logger = require('electron-log')
const { app } = require('electron')
const { join } = require('path')
const { version } = require('../package.json')

logger.initialize({ preload: true })
logger.variables.version = version
logger.variables.platform = process.platform
logger.variables.arch = process.arch
logger.variables.userData = app.getPath('userData')
logger.variables.appPath = app.getAppPath()
logger.transports.file.level = 'silly'
logger.transports.console.level = 'silly'

const format = JSON.stringify({
  date: '{y}-{m}-{d} {h}:{i}:{s}.{ms}',
  level: '{level}',
  message: '{text}',
  scope: '{scope}',
  processType: '{processType}',
  version: '{processType}',
  platform: '{platform}',
  userData: '{userData}',
  appPath: '{appPath}',
  arch: '{arch}',
})

logger.transports.console.format = format
logger.transports.file.format = format
logger.errorHandler.startCatching();

Object.assign(console, logger.functions)

const resolvePathFn = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = `${now.getMonth() + 1}`.padStart(2, '0')
  const day = `${now.getDate()}`.padStart(2, '0')
  return join(app.getPath('userData'), `logs/${year}-${month}-${day}.log`)
}

logger.transports.file.resolvePathFn = resolvePathFn
logger.transports.console.writeFn = resolvePathFn

module.exports = logger