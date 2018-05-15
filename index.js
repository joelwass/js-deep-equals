const compare = (arr1, arr2) => {
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

    if (typeof arr1[key] === 'object') {
      if (typeof arr2[key] === 'object') {
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

module.exports = compare