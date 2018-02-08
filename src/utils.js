import { concat, reduce } from 'ramda'
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
