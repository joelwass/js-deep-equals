const constants = require('./helpers/constants')
const test = require('ava')
const { compare, compareUnsorted } = require('../')

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
  t.false(compareUnsorted(constants.a, constants.c))
})

test('arrays equal unsorted', t => {
  t.true(compareUnsorted(constants.a, constants.b))
})

test('nested arrays and objects unsorted', t => {
  t.false(compareUnsorted([{a: {}}], [1]))
})

test('nested arrays equal unsorted', t => {
  t.true(compareUnsorted(constants.arr1, constants.arr4))
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

test('repeat values at same depth', t => {
  t.false(compareUnsorted(['a', 'a', 'a'], ['a', 'b', 'b']))
})
