import {
  map,
  compose,
  reduce,
  propEq,
  over,
  add,
  path,
  findIndex,
  lensPath,
  append,
  flatten,
  keys,
} from 'ramda'


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
  }
  return addQtyToList(index, shoppingItem, shoppingList)
}

const extractIngredientsFromDayMenu = (day) => {
  const dayMeals = keys(day)
  return flatten([dayMeals.map(meal => path([meal, 'ingredients'], day))])
}

export const getShoppingList = menu => compose(
  reduce(addElementToShoppingList, []),
  concatAll,
  map(extractIngredientsFromDayMenu),
)(menu)

export const removeElement = (shoppingList, element) =>
  shoppingList.filter(({ ingredient }) => ingredient !== element.ingredient)
