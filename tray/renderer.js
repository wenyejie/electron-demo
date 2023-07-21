const $btn = document.querySelector('.change')

$btn.addEventListener('click', () => {
  window.electron.changeTray()
})