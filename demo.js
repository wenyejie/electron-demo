const nodeAbi = require('node-abi')

console.log(nodeAbi.getAbi('18.16.0', 'node'))
// '51'
console.log(nodeAbi.getAbi('9.5.1', 'electron'))