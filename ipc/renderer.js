import ipc from './ipc4renderer.js'
const $input = document.getElementById('.input')
const $add = document.querySelector('.add')

$add.addEventListener('click', () => {
  ipc.send('login', { userId: 'userId', isVip: true })
})

ipc.on('loginSuccess').then(({ event, data }) => {
  console.log(event, data)
})