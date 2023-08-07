const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  screenshot: () => ipcRenderer.invoke('screenshot')
})