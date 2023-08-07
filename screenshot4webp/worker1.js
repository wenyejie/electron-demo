const { Worker, isMainThread, parentPort } = require('worker_threads')

const mainThread = () => {
  const worker = new Worker(__filename)

  worker.on('message', data => {
    console.log('message', data)
  })

  return worker
}


const workerThread = () => {
  parentPort.on('message', data => {

    console.log(data)
    parentPort.postMessage(data.toPNG())
    debugger
  })
}

if (isMainThread) {
  module.exports = mainThread
} else {
  workerThread()
}