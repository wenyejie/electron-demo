console.log(window.electronAPI, window.electronAPI.sendMessage)
window.electronAPI.receiveMessage((event, message) => {
  document.body.innerText = message
  console.log(message)
})