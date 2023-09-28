const { app, BrowserWindow, protocol, net } = require('electron')
const { join } = require('node:path')
const { pathToFileURL } = require('node:url')

const createWindow = () => {
  /*protocol.registerFileProtocol('static', (request, callback) => {
   // 事件注册渲染进程所需访问的url
   const url = request.url.replace('static:///', '');
   const folderPath = join(app.getAppPath(), 'static');
   // 具体要访问的文件名
   const filePath = join(folderPath, url);
   console.log(filePath)
   callback({ path: filePath });
   });
  protocol.handle('static', (request) => {
    return net.fetch(`C:\\storm\\workspace\\electron-demo\\static\\1691137205456.jpeg`)
  })*/

  protocol.handle('static', (request) => {
    let input = join(app.getAppPath(), 'static', request.url.replace(/^\w+:\/\/\//g, ''))
    console.log(input)
    return net.fetch(input)
  })
  const window = new BrowserWindow({

  })

  window.loadFile('./fileProtocol/index.html')
}

app.whenReady().then(createWindow)

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})