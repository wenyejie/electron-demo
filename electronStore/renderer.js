

document.querySelector('.set').addEventListener('click', () => {
  window.electronAPI.setStore('isLogin', true)
})

document.querySelector('.get').addEventListener('click', () => {
  console.log(window.electronAPI.getStore('isLogin'))
})

/*
window.electronAPI.config('isLogin', (a, b, c) => {
  console.log(a, b, c)
})*/
