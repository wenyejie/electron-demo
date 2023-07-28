class Ipc4renderer {
  // 桥接API
  #api = window.electronAPI
  // 回调map
  #queueMap = {}

  constructor() {
    this.#api.on((event, response) => {
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
      queue.forEach(({ callback }) => callback({ event, data }))

      // 移除只执行一次的函数
      this.#queueMap[channel] = queue.filter(({ type }) => type === 'on')
    })
  }

  invoke (channel, data) {
    if (!channel) {
      return
    }
    return this.#api.invoke({ channel, data })
  }

  // 发送事件
  send(channel, data) {
    if (!channel) {
      return
    }
    this.#api.send({ channel, data })
  }

  // 监听回调
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
    queue.push({ type: 'on', callback })
    return promise
  }

  // 只监听回调一次
  once(channel, callback) {
    if (!channel || typeof callback !== 'function') {
      return
    }
    this.#queueMap[channel] = this.#queueMap[channel] || []
    const queue = this.#queueMap[channel]
    const index = queue.findIndex(item => item.callback === callback && item.type === 'once')
    if (index >= 0) {
      return
    }
    queue.push({ type: 'once', callback })
  }

  // 移除回调
  off (channel, callback) {
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

  offChannel (channel) {
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
    return new Ipc4renderer()
  }

}

const ipc = Ipc4renderer.create()

export default ipc