const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {

  config: (options) => {
    return ipcRenderer.send('config', options)
  },

  getConfig: (callback) => {
    return ipcRenderer.on('getConfig', callback)
  },

  watchConfig: (callback) => {
    return ipcRenderer.on('watchConfig', callback)
  }
})