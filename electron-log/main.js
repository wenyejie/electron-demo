const logger = require('./logger')
const process = require('process')
const { app, BrowserWindow } = require('electron')


const createWindow = async () => {
  const window = new BrowserWindow()

  Promise.reject('Promise.reject uncatch')

  process.on('unhandledRejection', (reason, promise) => {
    // console.log(reason, promise)
    // debugger
  })

  return window
}

app.whenReady().then(createWindow)