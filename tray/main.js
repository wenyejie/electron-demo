const { app, Tray, ipcMain, BrowserWindow, Menu } = require('electron')
const path = require('path')

let win
let tray
const createWindow = () => {
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true, //是否完整的支持 node.
      enableRemoteModule: true, //来打开remote模块，使得渲染进程中可以调用主进程的方法
      contextIsolation: true,
      preload: path.join(__dirname, './preload.js')
    }
  })

  win.loadFile('./tray/index.html')
}

// 创建托盘
const createTray = (icon = path.join(__dirname, './logo@16x16.png')) => {
  tray = new Tray(icon)
  tray.setToolTip('tray demo!')
  const contextMenu = Menu.buildFromTemplate([
    {
      type: 'radio',
      checked: true,
      enabled: true,
      label: '开启屏幕截图',
      click: () => {
        // console.log('开启屏幕截图', menuItem, browserWindow, event)
        // mainWindow.webContents.send('onAILearnState', true)
        // tray.toggleImage(true)
      }
    },
    {
      type: 'radio',
      checked: false,
      enabled: false,
      label: '关闭屏幕截图',
      click: () => {
        // console.log('关闭屏幕截图', menuItem, browserWindow, event)
        // mainWindow.webContents.send('onAILearnState', false)
        // tray.toggleImage(false)
      }
    }
  ])
  tray.setContextMenu(contextMenu)
}

app.whenReady().then( () => {
  ipcMain.on('changeTray', async (event, response) => {
    tray.setImage(path.join(__dirname, './logo-gray@16x16.png'))
  })
  createWindow()
  createTray()
})