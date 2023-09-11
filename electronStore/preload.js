const {contextBridge, ipcRenderer} = require('electron')
const ElectronStore = require('electron-store')
const store = new ElectronStore()

contextBridge.exposeInMainWorld('electronAPI', {

  setStore: (key, value) => {
    return store.set(key, value)
  },

  getStore: (key) => {
    return store.get(key)
  },

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