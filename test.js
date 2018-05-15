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

test('not equal arrays with different types at indexes', t => {
  t.false(compare(arr5, arr1))
})

test('compare nested arrays not equal', t => {
  t.false(compare([[1, 2, 3]], [[1, 2]]))
})

test('compare nested objects not equal', t => {
  t.false(compare([{1: 'one'}], [{1: 'two'}]))
})

test('one object and one not an object', t => {
  t.false(compare([{ hi: 'world' }], [2]))
})

test('array lengths not the same', t => {
  t.false(compare([1, 2, 3], [1, 2]))
})

test('array of empty object with array of stringed curly braces', t => {
  t.false(compare([{a: {}}], [{a: '{}'}]))
})

test('array of empty object with array of empty object', t => {
  t.true(compare([{a: {}}], [{a: {}}]))
})

test('array of empty object with array different-keyed empty object', t => {
  t.false(compare([{a: {}}], [{b: {}}]))
})

test('array of empty object with array of empty array', t => {
  t.false(compare([{}], [[]]))
})

test('array of same dates', t => {
  t.true(compare([new Date('Tue Mar 24 2015 20:00:00 GMT-0400')], [new Date('Tue Mar 24 2015 20:00:00 GMT-0400')]))
})

test('array of dissimilar dates', t => {
  t.false(compare([new Date('Tue Mar 24 2015 20:00:00 GMT-0400')], [new Date('Tue Mar 24 2017 20:00:00 GMT-0400')]))
})

test('array of date and non date', t => {
  t.false(compare([new Date('Tue Mar 24 2015 20:00:00 GMT-0400')], [1]))
})

test('compare unsorted array lengths not the same', t => {
  t.false(compareUnsorted([1, 2, 3], [1, 2]))
})

test('compare unsorted array lengths not the same', t => {
  t.false(compareUnsorted([{ hi: { hello: 'world', 1: 2 }}], [1]))
})

test('compare unsorted with nested object', t => {
  t.false(compareUnsorted([{ hi: 'world' }, { hi: 'world' }], [1, 2]))
})

test('compare unsorted one object and one not an object', t => {
  t.false(compareUnsorted([{ hi: 'world' }], [2]))
})

test('compare unsorted long chain with not same', t => {
  t.false(compareUnsorted([0, 2, 3], [5, 6, 6]))
})

test('arrays not equal unsorted', t => {
  t.false(compareUnsorted(a, c))
})

test('arrays equal unsorted', t => {
  t.true(compareUnsorted(a, b))
})

test('nested arrays and objects unsorted', t => {
  t.false(compareUnsorted([{a: {}}], [1]))
})

test('nested arrays equal unsorted', t => {
  t.true(compareUnsorted(arr1, arr4))
})

test('array of empty object with array of stringed curly braces', t => {
  t.false(compareUnsorted([{a: {}}], [{a: '{}'}]))
})

test('array of empty object with array of empty object', t => {
  t.true(compareUnsorted([{a: {}}], [{a: {}}]))
})

test('array of empty object with array different-keyed empty object', t => {
  t.false(compareUnsorted([{a: {}}], [{b: {}}]))
})

test('array of empty object with array of empty array', t => {
  t.false(compareUnsorted([{}], [[]]))
})

test('array of same dates', t => {
  t.true(compareUnsorted([new Date('Tue Mar 24 2015 20:00:00 GMT-0400')], [new Date('Tue Mar 24 2015 20:00:00 GMT-0400')]))
})

test('array of dissimilar dates', t => {
  t.false(compareUnsorted([new Date('Tue Mar 24 2015 20:00:00 GMT-0400')], [new Date('Tue Mar 24 2017 20:00:00 GMT-0400')]))
})

test('array of date and non date', t => {
  t.false(compareUnsorted([new Date('Tue Mar 24 2015 20:00:00 GMT-0400')], [1]))
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

let arr5 = [
  [1, 2],
  3,
  { 'hello': 'world' },
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
