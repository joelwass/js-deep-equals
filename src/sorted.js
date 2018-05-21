const compareObjects = (arr1, arr2) => {
  if (Array.isArray(arr1) && Array.isArray(arr2)) {
    // a man's array does not look like a girl's array
    if (arr1.length !== arr2.length) return false
  }

  const keys = Object.keys(arr1)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (Array.isArray(arr1[key])) {
      if (Array.isArray(arr2[key])) {
        // a man has an array, a girl has a different array
        if (!compare(arr1[key], arr2[key])) return false
        // a man may share an array with a girl
        continue
      }
      // a man has an array, a girl does not
      return false
    }

    // account for date objects
    if (arr1[key] instanceof Date) {
      if (arr2[key] instanceof Date) {
        if (arr1[key].valueOf() !== arr2[key].valueOf()) return false
        continue
      }
      return false
    }

    // account for regexp
    if (arr1[key] instanceof RegExp) {
      if (arr2[key] instanceof RegExp) {
        if (arr1[key].toString() !== arr2[key].toString()) return false
        continue
      }
      return false
    }

    if (typeof arr1[key] === 'object') {
      if (typeof arr2[key] === 'object' && !Array.isArray(arr2[key])) {
        // a man has an object, a girl has a different object
        if (!compare(arr1[key], arr2[key])) return false
        continue
      }
      // a man has an object, a girl does not
      return false
    }
    // a man has values that a girl does not share
    if (arr1[key] !== arr2[key]) return false
  }

  return true
}

const compare = (a, b) => {
  if (a && b && ((Array.isArray(a) && Array.isArray(b)) || (typeof a === 'object' && typeof b === 'object')) && (a.length === b.length)) {
    return compareObjects(a, b)
  }
  return false
}

module.exports = compare
