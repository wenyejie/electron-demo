const { Worker, isMainThread, parentPort } = require('worker_threads')
const fs = require('fs')
const path = require('path')
const process = require('process')


const mainThread = (data) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(__filename)
    worker.on('message', data => {
      resolve(data)
    })
    worker.on('error', reject)
    worker.on('messageerror', reject)
    worker.postMessage(data)
  })
}

const workerThread = () => {
  parentPort.on('message', ({ buffer, folder }) => {
    // 没有static文件夹就创建
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder)
    }

    const timestamp = Date.now()

    const filePath = path.join(folder, `${timestamp}.jpeg`)
    fs.writeFile(filePath, buffer, err => {
      if (err) {
        console.error(err)
        process.exit()
        return
      }
      parentPort.postMessage(filePath)
      process.exit()
    })
  })

}

if (isMainThread) {
  module.exports = mainThread
} else {
  workerThread()
}