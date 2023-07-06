const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('test', {
  ping: () => ipcRenderer.invoke('ping')
})

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  // document.querySelector('#log').innerText = JSON.stringify(process)

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})