const { app, BrowserWindow, Menu, ipcMain, systemPreferences } = require('electron')
const path = require('path')
const ipc = require('./ipc4main')

function createWindow () {
  const mainWindow = new BrowserWindow({
    name: 'ipcTest',
    webPreferences: {
      preload: path.join(__dirname, './preload.js')
    }
  })

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          click: () => mainWindow.webContents.send('update-counter', 1),
          label: 'Increment'
        },
        {
          click: () => mainWindow.webContents.send('update-counter', -1),
          label: 'Decrement'
        }
      ]
    }

  ])

  Menu.setApplicationMenu(menu)
  mainWindow.loadFile('./ipc/index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  ipc.on('login').then(({ event, data }) => {
    // console.log(event, data)
    ipc.send(event.sender, 'loginSuccess', { autoLearning: true, isFirstStart: false })
  })

  ipc.invoke('getMediaAccessStatus', (event, data) => {
    return systemPreferences.getMediaAccessStatus('screen')
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})