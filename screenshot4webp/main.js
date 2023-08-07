const {
  app,
  desktopCapturer,
  screen,
  BrowserWindow,
  ipcMain,
} = require('electron')
const fs = require('fs')
const path = require('path')
const useWorker = require('./worker1')

const appPath = app.getAppPath() // app路径
const staticPath = path.join(appPath, 'static') // 静态资源路径
const screenSize = {} // 屏幕大小


// 获取屏幕大小
const getScreenSize = () => {
  if (screenSize.height) {
    return screenSize
  }
  const { size, scaleFactor } = screen.getPrimaryDisplay();
  screenSize.width = Math.floor(size.width * scaleFactor)
  screenSize.height = Math.floor(size.height * scaleFactor)
  return screenSize
}

const getSources = () => {
  return desktopCapturer.getSources({
    types: ['screen'],
    thumbnailSize: getScreenSize(),
  }).then(sources => {

    return new Promise(resolve => {
      const worker = useWorker()
      console.log(worker)
      worker.postMessage('1111')
      worker.on('message', (result) => {
        console.log('message', result)
      })
    })
    // const png = sources[0].thumbnail.toJPEG(100)
    // console.log(png.length)
    // return png
  })
}

const save2Local = (buffer) => {
  return new Promise((resolve, reject) => {
    // 没有static文件夹就创建
    if (!fs.existsSync(staticPath)) {
      fs.mkdirSync(staticPath)
    }

    const timestamp = Date.now()

    const savePath = path.join(staticPath, `${timestamp}.jpeg`)
    fs.writeFile(savePath, buffer, err => {
      if (err) {
        console.error(err)
        return reject(err)
      }
      return resolve(savePath)
    })
  })
}

const createWindow = () => {
  const window = new BrowserWindow({
    webPreferences: {
      nodeIntegrationInWorker: true,
      preload: path.join(__dirname, './preload.js'),
    },
  })

  window.loadFile('./screenshot4webp/index.html')

  return window
}

app.whenReady().then(async () => {

  createWindow()

  const { readdir } = require('fs/promises')

  // const files = await readdir((staticPath))

  // console.log(files)

  ipcMain.handle('screenshot', async () => {
    const buffer = await getSources()
    return save2Local(buffer)
  })

})