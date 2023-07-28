const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  on: (callback) => ipcRenderer.on('on', callback),
  send: (data) => ipcRenderer.send('send', data),
  invoke: (data) => ipcRenderer.invoke('invoke', data)
})