
document.addEventListener('DOMContentLoaded',  () => {
  window.electron.screenshot().then(async (url) => {
    console.log(url)
    document.querySelector('img').src = url
    const response = await fetch(url)
    const blob = await response.blob()
    debugger
    const file = new File([blob], 'demo.webp', { type: 'image/webp' })
    debugger
    // console.log(new File(response, 'demo.jpeg'))
  })

})