import { concat, reduce } from 'ramda'

const getRandomNumber = n => Math.round(Math.random() * n)

const getRandomFromArray = arr => {
  if (!Array.isArray(arr) || !arr.length) return
  return arr[getRandomNumber(arr.length - 1)]
}

const getRandomFromObject = obj => {
  return getRandomFromArray(Object.values(obj))
}

const findOrMessage = function(fn, msg) {
  return function(...args) {
    const result = fn.apply(this, args)
    return result || msg
  }
}

const concatAll = reduce(concat, [])

module.exports = {
  getRandomFromObject,
  getRandomFromArray,
  findOrMessage,
  concatAll,
}
