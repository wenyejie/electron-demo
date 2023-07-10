const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('colorScheme', {
  toggle: () => ipcRenderer.invoke('color-scheme:toggle'),
  system: () => ipcRenderer.invoke('color-scheme:system'),
})
