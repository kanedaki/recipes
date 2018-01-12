import {
  map,
  concat,
  compose,
  reduce,
  propEq,
  over,
  add,
  findIndex,
  lensPath,
  append,
  curry,
  prop
} from 'ramda'
const util = require('util')
import { concatAll } from './utils'

const hasIngredient = propEq('ingredient')

const sumQuantities = curry((firstQuantity, secondQuantity) => {
  if (!firstQuantity.amount) return secondQuantity
  if (firstQuantity.units === secondQuantity.units) {
    return {
      amount: add(firstQuantity.amount, secondQuantity.amount),
      units: firstQuantity.units
    }
  }
})

export const addElementToShoppingList = (acc, el) => {
  const index = findIndex(hasIngredient(el.ingredient), acc)
  if (index === -1) {
    return append({ ingredient: el.ingredient, qty: el.qty }, acc)
  } else if (!el.qty) {
    return acc
  } else {
    const elLens = lensPath([index, 'qty'])
    return over(elLens, sumQuantities(el.qty), acc)
  }
}

export const getShoppingList = menu => {
  const s = compose(
    reduce(addElementToShoppingList, []),
    concatAll,
    map(extractIngredientsFromDayMenu)
  )(menu)
  return s
}

const extractIngredientsFromDayMenu = ({ lunch, dinner }) => {
  return [...lunch.ingredients, ...dinner.ingredients]
}

export const removeElement = (shoppingList, element) => {
  return shoppingList.filter(
    ({ ingredient }) => ingredient !== element.ingredient
  )
}
