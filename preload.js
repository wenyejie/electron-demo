const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  receiveMessage: (message) => {
    console.log(message)
    return ipcRenderer.on('sendMessage', message)
  }
})