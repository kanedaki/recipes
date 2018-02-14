import { concat, reduce, values, zipObj, keys, map, sum, curry, compose, sequence, filter } from 'ramda'
import { winter, summer, autumn, spring } from './enums/seasons'

export const getRandomNumber = n => Math.round(Math.random() * n)

export const getRandomFromArray = (arr) => {
  if (!Array.isArray(arr) || !arr.length) return undefined
  return arr[getRandomNumber(arr.length - 1)]
}

export const getRandomFromObject = obj => getRandomFromArray(Object.values(obj))

export const findOrMessage = (fn, msg) =>
  async (...args) => {
    const result = await fn(...args)
    return result || msg
  }

export const concatAll = reduce(concat, [])

export const getSeason = () =>
  [winter, spring, summer, autumn][
    Math.floor(new Date().getMonth() / 12 * 4) % 4
  ]

export const normalizeWith = (total, partial) => Math.abs((partial * 100 / total) - 100)

export const objNormalizeWith = (total, partial) => sum(values(keys(total).reduce((acc, key) => {
  acc[key] = normalizeWith(total[key], partial[key])
  return acc
}, {})))

export const toPercentage = curry((total, partial) => partial * 100 / total)

export const keysToPercentage = (obj) => {
  const total = sum(values(obj))
  return zipObj(keys(obj), map(toPercentage(total), values(obj)))
}
