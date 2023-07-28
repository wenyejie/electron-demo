

class Config {
  constructor() {
    this.callbackMap = new Map()
    window.electronAPI?.getConfig((event, { key, value }) => {
      this.callbackMap.get(key)?.(value)
      this.callbackMap.delete(key)
    })

    window.electronAPI.watchConfig((event, { key, newValue, oldValue }) => {
      const cbs = this.callbackMap.get(`${key}-watch`)
      if (!cbs?.length) {
        return
      }
      cbs.forEach(cb => cb({ newValue, oldValue }))
    })
  }

  set (key, value) {
    window.electronAPI.config({key, value})
  }

  get(key, callback) {
    if (typeof callback !== 'function') {
      return new Promise(resolve => {
        window.electronAPI.config({key})
        this.callbackMap.set(key, resolve)
      })
    } else {
      this.callbackMap.set(key, callback)
      window.electronAPI.config({key})
    }
  }

  watch (key, callback) {
    let cbs = []
    if (this.callbackMap.has(`${key}-watch`)) {
      cbs = this.callbackMap.get(`${key}-watch`)
    }
    if (typeof callback !== 'function') {
      return new Promise(resolve => {
        window.electronAPI.config({key, watch: true})
        cbs.push(resolve)
        this.callbackMap.set(`${key}-watch`, cbs)
      })
    } else {
      cbs.push(callback)
      this.callbackMap.set(`${key}-watch`, cbs)
      window.electronAPI.config({key, watch: true})
    }
  }

  create () {
    return new Config()
  }
}

const config = new Config()



config.watch('1', ({ newValue, oldValue }) => {
  console.log('config watch username', newValue, oldValue)
})

document.querySelector('.set').addEventListener('click', () => {
  config.set('1.autoStart', true)
})

document.querySelector('.get').addEventListener('click', () => {
  config.get('1').then(value => {
    console.log('get config', value)
  })
})

/*
window.electronAPI.config('isLogin', (a, b, c) => {
  console.log(a, b, c)
})*/
