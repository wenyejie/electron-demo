import ipc from './ipc4renderer.js'
const $input = document.getElementById('.input')
const $add = document.querySelector('.add')

$add.addEventListener('click', () => {
  // ipc.send('login', { userId: 'userId', isVip: true })
  // console.log('getMediaAccessStatus:', ipc.invoke('getMediaAccessStatus', { name: 'test' }))
  ipc.invoke('getMediaAccessStatus', { name: 'test' }).then(response => {
    console.log(response)
  })
})

ipc.on('loginSuccess').then(({ event, data }) => {
  console.log(event, data)
})