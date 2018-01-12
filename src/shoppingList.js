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

const sumQuantities = curry((qty1, qty2) => {
  qty1 = qty1 || {}
  qty2 = qty2 || {}
  if (!qty1.amount) return qty2
  if (qty1.units === qty2.units) {
    return {
      amount: add(prop('amount', qty1), prop('amount', qty2)),
      units: prop('units', qty1)
    }
  }
})

export const addElementToShoppingList = (acum, el) => {
  const index = findIndex(hasIngredient(el.ingredient), acum)
  if (index === -1) {
    return append({ ingredient: el.ingredient, qty: el.qty }, acum)
  } else {
    const elLens = lensPath([index, 'qty'])
    return over(elLens, sumQuantities(el.qty), acum)
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
