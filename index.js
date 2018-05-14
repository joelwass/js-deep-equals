const mapifyRecursive = (arr1, retObject = {}, currKey = '') => {
  const isObject = typeof arr1 === 'object'
  const isArray = Array.isArray(arr1)
  const keys = Object.keys(arr1)

  keys.forEach(key => {
    if (Array.isArray(arr1[key]) || typeof arr1[key] === 'object') {
      if (isArray) {
        return mapify(arr1[key], retObject, `${currKey}[${key}]`)
      } else if (isObject) {
        return mapify(arr1[key], retObject, `${currKey}.${key}`)
      }
    } else {
      if (isArray) {
        retObject[`${currKey}[${key}]`] = arr1[key]
      } else if (isObject) {
        retObject[`${currKey}.${key}`] = arr1[key]
      }
    }
  })
  return retObject
}

const mapify = (arr1) => {
  const stillGoing = true
  const retObject = {}
  let currObject = arr1
  let currKey = ''
  
  while (stillGoing) {
    const isObject = typeof currObject === 'object'
    const isArray = Array.isArray(currObject)
    const keys = Object.keys(currObject)
    keys.forEach(key => {
      if (Array.isArray(currObject[key]) || typeof currObject[key] === 'object') {
        if (isArray) {
          currObject = currObject[key]
          currKey = currKey + '[' + key
        } else if (isObject) {
          currObject = currObject[key]
          currKey = currKey + '.' + key
        }
      } else {
        if (isArray) {
          retObject[currKey + '[' + key] = currObject[key]
        } else if (isObject) {
          retObject[currKey + '.' + key] = currObject[key]
        }
      }
    })
  }

  return retObject
}

const deepEqual = (arr1, arr2) => {
  // edge case
  if (arr1.length !== arr2.length) return false

  const map1 = mapify(arr1)
  const map2 = mapify(arr2)

  const map1Keys = Object.keys(map1)

  for (var i = 0; i < map1Keys.length; i++) {
    const currKey = map1Keys[i]
    if (!map2[currKey] || map2[currKey] !== map1[currKey]) return false
  }
  return true
}

module.exports = {
  mapify,
  deepEqual
};

