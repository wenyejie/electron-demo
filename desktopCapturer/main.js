const { app, screen, ipcMain, BrowserWindow, desktopCapturer } = require('electron')
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

app.whenReady().then( () => {
  ipcMain.on('startScreenCapture', async (event, response) => {
    const imgUrl = await screenCapture()
    win.webContents.send('getScreenCaptureData', imgUrl)
  })
  createWindow()
})