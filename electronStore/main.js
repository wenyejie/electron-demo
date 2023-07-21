const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')
const ElectronStore = require('electron-store')

const store = new ElectronStore()

ElectronStore.initRenderer()

store.set('demo', 1111)

function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      // preload: path.join(__dirname, './preload.js')
    }
  })
  mainWindow.loadFile('./electronStore/index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})