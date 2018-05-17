# array-deep-equals
[![Build Status](https://travis-ci.org/joelwass/array-deep-equals.svg?branch=master)](https://travis-ci.org/joelwass/array-deep-equals)
[![Coverage Status](https://coveralls.io/repos/github/joelwass/array-deep-equal/badge.svg?branch=master)](https://coveralls.io/github/joelwass/array-deep-equal?branch=master)

testing of array deep equality (unsorted and sorted), accounts for nested arrays and nested objects

sorted array compare is up to ~%60 faster than the `JSON.stringify` method [jsperf](https://jsperf.com/array-deep-equals)

## usage

`npm install array-deep-equals`

```javascript
const { arrayDeepEqual, arrayDeepEqualUnsorted } = require('array-deep-equals')
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

let arr3 = [
  1,
  'test',
  2,
  3,
  'test2',
  {
    b: 13,
    a: 12, // different order of objects is ok
    d: [ 71, 72, { 'sonested': true }, 73 ]
    c: 14,
  },
  'test3'
]

arrayDeepEqual(arr1, arr2) // true
arrayDeepEqualUnsorted(arr1, arr2) // true
```

## License
MIT
