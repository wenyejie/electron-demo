
const $start = document.querySelector('.start')

const $imgs = document.querySelector('.imgs')

$start.addEventListener('click', () => {
  window.electron.startScreenCapture()
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