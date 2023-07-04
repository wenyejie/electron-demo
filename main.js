const { app, BrowserWindow } = require('electron');

function createWindow() {
  // 创建一个新的浏览器窗口
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // 加载应用的HTML文件
  win.loadFile('index.html');
}

// 当Electron完成初始化并准备创建浏览器窗口时调用createWindow函数
app.whenReady().then(createWindow);