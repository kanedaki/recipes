import { propEq, and, any, prop, equals } from 'ramda'
import { getRandomFromArray, findOrMessage } from './utils'
import MealTypes from './mealTypes'
import recipes from './recipes/index'
import { lunch, dinner } from './meals'

export function matchMealType(recipe, mealType) {
  return propEq('mealType', mealType, recipe)
}

export function matchMeal(recipe, meal) {
  return any(equals(meal), prop('meal', recipe))
}

function findRecipeByName(name) {
  return Object.values(recipes)
    .map(recipe => recipe.name)
    .find(recipe => recipe.name === name)
}

export function createMenu(template) {
  return template.map(({ lunch: lunchMealType, dinner: dinnerMealType }) => {
    return {
      lunch: getRecipeForMealType(lunchMealType, lunch),
      dinner: getRecipeForMealType(dinnerMealType, dinner),
    }
  })
}

const NO_RECIPE_ERROR = 'no recipe for'
const getRecipeForMealType = findOrMessage(findRecipe, NO_RECIPE_ERROR)

function findRecipe(mealType, meal) {
  if (!MealTypes.includes(mealType)) return undefined
  const validRecipes = recipes.filter(recipe =>
    and(matchMealType(recipe, mealType), matchMeal(recipe, meal)),
  )
  return getRandomFromArray(validRecipes)
}
