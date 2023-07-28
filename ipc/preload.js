const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  on: (callback) => ipcRenderer.on('on', callback),
  send: (options) => ipcRenderer.send('send', options),
})