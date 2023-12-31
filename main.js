// 主进程
const { app, BrowserWindow, ipcMain } = require('electron')
const iohook = require('iohook')
const {join} = require('path')

let win
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: true,
      preload: join(__dirname, 'preload.js')
    },
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  let wheelIsDown = false

  iohook.on('mousewheel', (event) => {
    // console.log('mousewheel', event)
  })
  iohook.on('mousedown', (event) => {
    if (event.button === 3) {
      wheelIsDown = true
      // console.log('mousedown', event)
    }
  })
  iohook.on('mouseup', (event) => {
    if (event.button === 3) {
      wheelIsDown = false
      // console.log('mouseup', event)
    }
  })
  /* iohook.on('keydown', (event) => {
    console.log('keydown', event)
  }) */
  iohook.registerShortcut([29, 42], (keys) => {
    // console.log('Ctrl+Shift', keys)
    if (wheelIsDown) {
      // console.log('you use Ctrl+Shift+Wheel!!!' + Math.random(1))
      win.webContents.send('sendMessage', 'you use Ctrl+Shift+Wheel!!!!' + Math.random(1))
    }
  })

  iohook.start(false)
})
