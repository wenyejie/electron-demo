document
  .querySelector('#toggle-color-scheme')
  .addEventListener('click', async () => {
    const isDarkMode = await window.colorScheme.toggle()
    document.querySelector('#theme-source').innerHTML = isDarkMode
      ? 'Dark'
      : 'Light'
  })

document
  .querySelector('#reset-to-system')
  .addEventListener('click', async () => {
    await window.colorScheme.system()
    document.querySelector('#theme-source').innerHTML = 'System'
  })
