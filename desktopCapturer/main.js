const { app, screen, ipcMain, BrowserWindow, desktopCapturer, systemPreferences } = require('electron')
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

const screenCapture = () => {
  return new Promise((resolve, reject) => {
    const { size: { width, height }, scaleFactor } = screen.getPrimaryDisplay()
    desktopCapturer.getSources({
      types: ['screen'],
      thumbnailSize: {
        width: Math.floor(width * scaleFactor),
        height: Math.floor(height * scaleFactor)
      }
    }).then(response => {
      const thumbnails = []
      response.forEach(({ thumbnail }) => {
        thumbnails.push(thumbnail.toDataURL())
      })
      resolve(thumbnails)
    }).catch(e => {
      reject(e)
    })
  })
}

const hasScreenCaptureAccess = () => {
  return systemPreferences.getMediaAccessStatus('screen') === 'granted'
}

const askScreenCaptureAccess = () => {
  if (hasScreenCaptureAccess()) {
    return true
  }
  return systemPreferences.askForMediaAccess('screen')
}

async function requestScreenCapturePermission() {
  const status = systemPreferences.getMediaAccessStatus('screen')
  if (status === 'not-determined') {
    const success = await systemPreferences.askForMediaAccess('screen')
    if (success) {
      console.log('用户已授权屏幕录制权限')
    } else {
      console.log('用户拒绝了屏幕录制权限')
    }
  } else if (status === 'granted') {
    console.log('应用程序已经具有屏幕录制权限')
  } else {
    console.log('应用程序没有屏幕录制权限')
  }
}

app.whenReady().then( () => {

  console.log('hasScreenCaptureAccess:', hasScreenCaptureAccess())

  console.log('askScreenCaptureAccess:', askScreenCaptureAccess())

  createWindow()
})