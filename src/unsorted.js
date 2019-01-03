const { v3: hash } = require('murmurhash')

const EMPTY_OBJECT = '__empty__obj'
const EMPTY_ARRAY = '__empty__arr'

class Node {
  constructor() {
    this.children = []
    this.hash = 0
  }
}

const hasher = (thing, prefix = '') => {
  const stringThing = prefix + (typeof thing) + '::' + thing
  return hash(stringThing)
}

const combineHashes = (parentHash, child) => {
  return (parentHash + child.hash) & 0xFFFFFFFF
}

const newNode = (thing, prefix) => {
  const node = new Node()
  node.hash = hasher(thing, prefix)
  return node
}

const createTree = (currNode, currentInput, prefix = '') => {
  const isObject = typeof currentInput === 'object'
  const isArray = Array.isArray(currentInput)
  const keys = Object.keys(currentInput)

  // we're at a weird value
  if (currentInput instanceof Date || currentInput instanceof RegExp) {
    return newNode(currentInput, prefix)
  }

  // if we're at a value
  if (!isObject && !isArray) {
    return newNode(currentInput, prefix)
  }
  
  // if we're at an iterable
  if (!keys.length) {
    return isArray ? newNode(EMPTY_ARRAY, prefix) : newNode(EMPTY_OBJECT, prefix)
  }
  for (var i = 0; i < keys.length; i++) {
    const key = keys[i]
    
    let prefix
    if (!isArray && isObject) { // if we're dealing with an object prefix the key
      prefix = key
    }

    const node = createTree(new Node(), currentInput[key], prefix)
    currNode.children.push(node)
  }
  // iterable's hash is combined hash of all children
  let combined = currNode.children.reduce(combineHashes, 0)
  currNode.hash = hasher(combined)
  return currNode
}

const createFinalHash = (input) => {
  const tree = createTree(new Node(), input)
  return tree.hash
}

const compareUnsorted = (a, b) => {
  if (a && b && ((Array.isArray(a) && Array.isArray(b)) || (typeof a === 'object' && typeof b === 'object')) && (a.length === b.length)) {
    return createFinalHash(a) === createFinalHash(b)
  }
  return false
}

module.exports = compareUnsorted
