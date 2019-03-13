const constants = require('./helpers/constants')
const test = require('ava')
const { compare } = require('../')

test('not passing in objects or arrays', t => {
  t.false(compare(1, 2))
  t.false(compare(null, 2))
  t.false(compare(undefined, 2))
  t.false(compare({ a: null }, { a: [1, 2, 3] }))
  t.false(compare({ a: undefined }, { a: [1, 2, 3] }))
})

test('sorted: arrays not equal', t => {
  t.false(compare(constants.a, constants.c))
})

test('sorted: arrays equal', t => {
  t.true(compare(constants.a, constants.b))
})

test('sorted: objects equal', t => {
  t.true(compare(constants.aObject, constants.bObject))
})

test('sorted: objects not equal', t => {
  t.false(compare(constants.aObject, constants.cObject))
})

test('sorted: deeper arrays equal', t => {
  t.true(compare(constants.arr1, constants.arr2))
})

test('sorted: deeper not equal because different orders', t => {
  t.false(compare(constants.arr1, constants.arr3))
})

test('sorted: not equal arrays with different types at indexes', t => {
  t.false(compare(constants.arr5, constants.arr1))
})

test('sorted: compare nested arrays not equal', t => {
  t.false(compare([[1, 2, 3]], [[1, 2]]))
})

test('sorted: compare nested objects not equal', t => {
  t.false(compare([{1: 'one'}], [{1: 'two'}]))
})

test('sorted: one object and one not an object', t => {
  t.false(compare([{ hi: 'world' }], [2]))
})

test('sorted: array lengths not the same', t => {
  t.false(compare([1, 2, 3], [1, 2]))
})

test('sorted: array of empty object with array of stringed curly braces', t => {
  t.false(compare([{a: {}}], [{a: '{}'}]))
})

test('sorted: array of empty object with array of empty object', t => {
  t.true(compare([{a: {}}], [{a: {}}]))
})

test('sorted: array of empty object with array different-keyed empty object', t => {
  t.false(compare([{a: {}}], [{b: {}}]))
})

test('sorted: array of empty object with array of empty array', t => {
  t.false(compare([{}], [[]]))
})