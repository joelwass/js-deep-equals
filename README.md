# deep-equals
[![Build Status](https://travis-ci.org/joelwass/deep-equals.svg?branch=master)](https://travis-ci.org/joelwass/deep-equals)
[![Coverage Status](https://coveralls.io/repos/github/joelwass/deep-equals/badge.svg?branch=master)](https://coveralls.io/github/joelwass/deep-equals?branch=master)

testing of array and object deep equality (unsorted and sorted), accounts for nested arrays and nested objects

faster than `JSON.stringify(x) === JSON.stringify(y)` and Lodash's isEqual.

unsorted arrays are compared using a variation of the <a href="https://en.wikipedia.org/wiki/Merkle_tree">Merkle Tree</a>

## usage

`npm install deep-equals`

```javascript
const { compare, compareUnsorted } = require('deep-equals')
const arr1 = [
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

// order and contents are the same as arr1
let arr2 = [
  1,
  2,
  3,
  'test',
  'test2',
  'test3',
  {
    b: 13,
    a: 12, // different order of objects is ok
    c: 14,
    d: [ 71, 72, 73, { 'sonested': true } ]
  }
]

// order of this array is different than arr1, but content is the same
let arr3 = [
  1,
  'test',
  2,
  3,
  'test2',
  {
    b: 13,
    a: 12,
    d: [ 71, 72, { 'sonested': true }, 73 ]
    c: 14,
  },
  'test3'
]

compare(arr1, arr2) // true
compare(arr1, arr3) // false
compareUnsorted(arr1, arr3) // true
```

## License
MIT
