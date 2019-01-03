const test = require('ava')
const { compare, compareUnsorted } = require('../')

let a = []
let a2 = []
let b = []

test.before(() => {
  for (let j = 0; j < 5; j++) {
    a.push([])
    a2.push([])
    b.push([])
    for (let i = 0; i < 100000; i++) {
      let x = Math.floor(Math.random() * i)
      a[j].push(x)
      a2[j].push(x)
      b[j].push(x)
    }
    b[j].reverse()
  }

  b.reverse()
})

test('compare unsorted arrays that are huge', t => {
  t.true(compareUnsorted(a, b))
})

test('compare sorted arrays that are huge', t => {
  t.true(compare(a, a2))
})

