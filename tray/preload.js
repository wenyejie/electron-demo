const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  // 截图事件
  // 发起截屏事件
  changeTray: () => {
    ipcRenderer.send('changeTray')
  },
  // 窗口获取截图data
  /*getScreenCaptureData: (callback) => {
    ipcRenderer.on('getScreenCaptureData', callback)
  },*/
})