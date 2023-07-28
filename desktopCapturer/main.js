const { app, screen, BrowserWindow, desktopCapturer, systemPreferences } = require('electron')
const path = require('path')

let win
const createWindow = () => {
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true, //是否完整的支持 node.
      enableRemoteModule: true, //来打开remote模块，使得渲染进程中可以调用主进程的方法
      contextIsolation: true,
      preload: path.join(__dirname, './preload.js')
    }
  })

  win.loadFile('./desktopCapturer/index.html')
}

const hasScreenCaptureAccess = () => {
  return systemPreferences.getMediaAccessStatus('screen') === 'granted'
}

const tryScreenCapture = () => {
  return desktopCapturer.getSources({
    types: ['screen'],
    thumbnailSize: {
      width: 100,
      height: 100,
    }
  }).then(sources => {
    console.log('screen capture success', sources.length > 0)
    return Promise.resolve(sources.length > 0)
  }, reason => {
    console.log('screen capture failed', reason)
    return Promise.reject(reason)
  }).catch(error => {
    console.log('screen capture failed', error)
    return Promise.reject(error)
  })
}

const askScreenCaptureAccess = () => {
  if (hasScreenCaptureAccess()) {
    return true
  }

  try {
    return systemPreferences.askForMediaAccess('screen')
  } catch (e) {
    return tryScreenCapture()
  }
}

app.whenReady().then( () => {

  console.log('hasScreenCaptureAccess:', hasScreenCaptureAccess())

  console.log('askScreenCaptureAccess:', askScreenCaptureAccess())

  createWindow()
})