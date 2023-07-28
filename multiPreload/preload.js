const { contextBridge, ipcRenderer } = require('electron')
require('./preload1')

contextBridge.exposeInMainWorld('electronAPI', {
  handleCounter: (callback) => ipcRenderer.on('update-counter', callback)
})