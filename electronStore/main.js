const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')
const ElectronStore = require('electron-store')

const store = new ElectronStore()

ElectronStore.initRenderer()

function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true, //是否完整的支持 node.
      // enableRemoteModule: true, //来打开remote模块，使得渲染进程中可以调用主进程的方法
      // contextIsolation: true,
      preload: path.join(__dirname, './preload.js')
    }
  })
  mainWindow.loadFile('./electronStore/index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  ipcMain.on('config', (event, {key, value, watch}) => {
    if (watch) {
      return store.onDidChange(key, (newValue, oldValue) => {
        console.log('watch config', newValue, oldValue)
        return event.sender.send('watchConfig', { key, newValue, oldValue })
      })
    }

    if (value === undefined) {
      // event.sender.send()
      value = store.get(key)
      return event.sender.send('getConfig', { key, value })
    }
    if (store.get(key) === value) {
      return
    }
    return store.set(key, value)
  })

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})