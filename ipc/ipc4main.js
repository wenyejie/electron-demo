const { ipcMain } = require('electron')

class Ipc4main {
  #queueMap = {}

  constructor() {
    ipcMain.on('send', (event, response) => {
      if (!response || !response?.channel) {
        return
      }
      const { channel, data } = response

      if (!channel) {
        return
      }
      const queue = this.#queueMap[channel]
      if (!queue) {
        return
      }
      queue.forEach(({ callback }) =>{
        callback({ event, data })
      })

      // 移除只执行一次的函数
      this.#queueMap[channel] = queue.filter(({ type }) => type === 'on')
    })

  }

  on(channel, callback) {
    if (!channel) {
      return
    }
    let promise
    if (typeof callback !== 'function') {
      promise = new Promise(resolve => callback = resolve)
    }
    this.#queueMap[channel] = this.#queueMap[channel] || []
    const queue = this.#queueMap[channel]
    const index = queue.findIndex(item => item.callback === callback && item.type === 'on')
    if (index >= 0) {
      return
    }
    queue.push({ callback, type: 'on' })
    return promise
  }

  once(channel, callback) {
    if (!channel) {
      return
    }
    let promise
    if (typeof callback !== 'function') {
      promise = new Promise(resolve => callback = resolve)
    }
    this.#queueMap[channel] = this.#queueMap[channel] || []
    const queue = this.#queueMap[channel]
    const index = queue.findIndex(item => item.callback === callback && item.type === 'once')
    if (index >= 0) {
      return
    }
    queue.push({ callback, type: 'once' })
    return promise
  }

  send(sender, channel, data) {
    sender?.send('on', { channel, data })
  }

  // 移除回调
  off(channel, callback) {
    if (!channel || typeof callback !== 'function') {
      return
    }
    const queue = this.#queueMap[channel]
    if (!queue) {
      return
    }
    const index = queue.findIndex(item => item.callback === callback)

    if (index < 0) {
      return
    }
    queue.splice(index, 1)
    if (queue.length === 0) {
      delete this.#queueMap[channel]
    }
  }

  offChannel(channel) {
    if (!channel) {
      return
    }
    const queue = this.#queueMap[channel]
    if (!queue) {
      return
    }
    delete this.#queueMap[channel]
  }

  static create() {
    return new Ipc4main()
  }
}

const ipc = Ipc4main.create();

module.exports = ipc

