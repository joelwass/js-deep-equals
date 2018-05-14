# array-deep-equal
testing of array deep equality, accounts for nested arrays and nested objects

up to ~%60 faster than the `JSON.stringify` method [jsperf](https://jsperf.com/array-deep-equals)

`npm install array-deep-equal`

```javascript
const arrayDeepEqual = require('array-deep-equal')
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

arrayDeepEqual(arr1, arr2) // true
```

## License
MIT
