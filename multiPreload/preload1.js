const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI1', {
  handleCounter: (callback) => ipcRenderer.on('update-counter', callback)
})