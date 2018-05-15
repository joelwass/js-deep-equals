const test = require('ava')
const { compare, compareUnsorted } = require('./')

test('arrays not equal', t => {
  t.false(compare(a, c))
})

test('arrays equal', t => {
  t.true(compare(a, b))
})

test('deeper arrays equal', t => {
  t.true(compare(arr1, arr2))
})

test('deeper not equal because different orders', t => {
  t.false(compare(arr1, arr3))
})

test('arrays not equal unsorted', t => {
  t.false(compareUnsorted(a, c))
})

test('arrays equal unsorted', t => {
  t.true(compareUnsorted(a, b))
})

test('nested arrays equal unsorted', t => {
  t.true(compareUnsorted(arr1, arr4))
})

const a = [1, 2, 'test', { a: '1' }, ['five', 'six', { hi: 'world' }]]
const b = [1, 2, 'test', { a: '1' }, ['five', 'six', { hi: 'world' }]]
const c = [1, 2, { a: '1' }, 'test']
let arr1 = [
  1,
  2,
  3,
  'test',
  'test2',
  'test3',
  {
    a: 12,
    b: 13,
    c: 14,
    d: [ 71, 72, 73, { 'sonested': true } ]
  }
]

let arr2 = [
  1,
  2,
  3,
  'test',
  'test2',
  'test3',
  {
    a: 12,
    b: 13,
    c: 14,
    d: [ 71, 72, 73, { 'sonested': true } ]
  }
]

let arr4 = [
  1,
  3,
  2,
  'test',
  {
    a: 12,
    b: 13,
    c: 14,
    d: [ 71, 72, 73, { 'sonested': true } ]
  },
  'test2',
  'test3',
]

let arr3 = [
  3,
  1,
  2,
  'test2',
  'test3',
  'test',
  {
    a: 12,
    c: 14,
    b: 13,
    d: [ 71, 72, 73, { 'sonested': true } ]
  }
]
