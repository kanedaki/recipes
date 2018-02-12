import { concat, reduce, values, add, zipObj, keys, map, sum } from 'ramda'
import { winter, summer, autumn, spring } from './enums/seasons'

export const getRandomNumber = n => Math.round(Math.random() * n)

export const getRandomFromArray = (arr) => {
  if (!Array.isArray(arr) || !arr.length) return undefined
  return arr[getRandomNumber(arr.length - 1)]
}

export const getRandomFromObject = obj => getRandomFromArray(Object.values(obj))

export const findOrMessage = (fn, msg) =>
  (...args) => {
    const result = fn.apply(this, args)
    return result || msg
  }

export const concatAll = reduce(concat, [])

export const getSeason = () =>
  [winter, spring, summer, autumn][
    Math.floor(new Date().getMonth() / 12 * 4) % 4
  ]

export const normalizeWith = (total, partial) => Math.abs((partial * 100 / total) - 100)

export const toPercentage = (total, partial) => partial * 100 / total

export const keysToPercentage = (obj) => {
  const total = reduce(add, 0, values(obj))
  return zipObj(keys(obj), map(toPercentage(total), values(obj)))
}

export const sumKeys = (obj) => {
  console.log('sum keys', obj)
  return zipObj(keys(obj), reduce(sum, 0, values(obj)))
}
