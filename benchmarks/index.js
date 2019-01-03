const { compare } = require('../')
const equal = require('lodash.isequal')

let a = [1, 2, 'test', { a: '1' }, ['five', 'six', { hi: 'world' }]]
let b = [1, 2, 'test', { a: '1' }, ['five', 'six', { hi: 'world' }]]

function getAvgTime (f, a, b) {
  let runs = 1e5
  let results = []
  for (let i = 0; i < runs; i++) {
    let start = process.hrtime()
    f(a, b)
    results.push(process.hrtime(start))
  }
  return results
    .reduce(([ts, tns], [s, ns]) => [ts + s, tns + ns], [0, 0])
    .map(x => x / runs)
}

function json (a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}

let _ = getAvgTime(() => {}, a, b) // warmup
let [js, jns] = getAvgTime(json, a, b)
let [ls, lns] = getAvgTime(equal, a, b)
let [ss, sns] = getAvgTime(compare, a, b)
console.info('Avg execution time JSON.stringify:\t\t %ds %dns', js, jns)
console.info('Avg execution time Lodash isEqual:\t\t %ds %dns', ls, lns)
console.info('Avg execution time js-deep-equals:\t\t %ds %dns', ss, sns)
