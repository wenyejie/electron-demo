
const $start = document.querySelector('.start')
const $auth = document.querySelector('.auth')

const $imgs = document.querySelector('.imgs')

$start.addEventListener('click', () => {
  window.electron.startScreenCapture()
})

$auth.addEventListener('click', () => {
  window.electron.checkScreenCapturerAccess()
})

window.electron.screenCapturerAccess((event, result) => {
  console.log('screenCapturerAccess result:', result)
})

window.electron.getScreenCaptureData(async (event, response) => {
  console.log(event, response)
  const imgs = document.createDocumentFragment()
  response.forEach(item => {
    const img = document.createElement('img')
    img.src = item
    imgs.append(img)
  })
  $imgs.append(imgs)

})