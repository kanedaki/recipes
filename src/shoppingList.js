import {
  map,
  concat,
  compose,
  reduce,
  propEq,
  over,
  add,
  defaultTo,
  path,
  findIndex,
  lensPath,
  append,
  curry,
  prop
} from 'ramda'
const util = require('util')
import { concatAll } from './utils'

const hasIngredient = propEq('ingredient')

const findItemInList = (item, list) => findIndex(hasIngredient(item), list)
const addItemToList = (item, list) => append(item, list)
const addQtyToList = (index, item, list) => {
    const elLens = lensPath([index, 'qty'])
    return over(elLens, add(item.qty), list)
}

export const addElementToShoppingList = (shoppingList, shoppingItem) => {
  const index = findItemInList(shoppingItem.ingredient, shoppingList) 
  if (index === -1) {
    return addItemToList(shoppingItem, shoppingList)
  } else {
    return addQtyToList(index, shoppingItem, shoppingList)
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
