const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  // 截图事件
  // 发起截屏事件
  startScreenCapture: (arg) => {
    ipcRenderer.send('startScreenCapture', arg)
  },
  // 窗口获取截图data
  getScreenCaptureData: (callback) => {
    ipcRenderer.on('getScreenCaptureData', callback)
  },
  checkScreenCapturerAccess: () => {
    ipcRenderer.send('checkScreenCapturerAccess')
  },
  screenCapturerAccess: (callback) => {
    ipcRenderer.on('screenCapturerAccess', callback)
  }
})