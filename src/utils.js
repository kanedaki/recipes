import { concat, reduce } from 'ramda'
import { winter, summer, autumn, spring } from './seasons'

const getRandomNumber = n => Math.round(Math.random() * n)

export const getRandomFromArray = arr => {
  if (!Array.isArray(arr) || !arr.length) return
  return arr[getRandomNumber(arr.length - 1)]
}

export const getRandomFromObject = obj => {
  return getRandomFromArray(Object.values(obj))
}

export const findOrMessage = function(fn, msg) {
  return function(...args) {
    const result = fn.apply(this, args)
    return result || msg
  }
}

export const concatAll = reduce(concat, [])

export const getSeason = () =>
  [winter, spring, summer, autumn][
    Math.floor(new Date().getMonth() / 12 * 4) % 4
  ]
