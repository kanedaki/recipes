import {
  allPass,
  all,
  propEq,
  and,
  any,
  prop,
  equals,
  compose,
  not,
  path,
} from 'ramda'
import { getRandomFromArray, findOrMessage } from './utils'
import MealTypes from './mealTypes'
import recipes from './recipes/index'
import { lunch, dinner } from './meals'

export const matchMealType = ({ mealType }) => propEq('mealType', mealType)

export const matchMeal = ({ meal }) => compose(any(equals(meal)), prop('meal'))

export const isDifferentLunchRecipe = recipeName =>
  compose(not, equals(recipeName), path(['lunch', 'name']))

export const isDifferentDinnerRecipe = recipeName =>
  compose(not, equals(recipeName), path(['dinner', 'name']))

export const notIncludedAlready = ({ currentMenu }) => recipe => {
  const recipeName = prop('name', recipe)
  return all(
    allPass([
      isDifferentLunchRecipe(recipeName),
      isDifferentDinnerRecipe(recipeName),
    ]),
  )(currentMenu)
}

function findRecipeByName(name) {
  return Object.values(recipes)
    .map(recipe => recipe.name)
    .find(recipe => recipe.name === name)
}

export function createMenu(template) {
  return template.reduce(
    (currentMenu, { lunch: lunchMealType, dinner: dinnerMealType }) => {
      currentMenu.push({
        lunch: getRecipeForMealType({
          mealType: lunchMealType,
          meal: lunch,
          currentMenu,
        }),
        dinner: getRecipeForMealType({
          mealType: dinnerMealType,
          meal: dinner,
          currentMenu,
        }),
      })
      return currentMenu
    },
    [],
  )
}

const NO_RECIPE_ERROR = 'no recipe found'
const getRecipeForMealType = findOrMessage(findRecipes, NO_RECIPE_ERROR)

export const findRecipe = options =>
  allPass([
    matchMeal(options),
    matchMealType(options),
    notIncludedAlready(options),
  ])

function findRecipes(options) {
  if (!MealTypes.includes(options.mealType)) return undefined
  const validRecipes = recipes.filter(findRecipe(options))
  return getRandomFromArray(validRecipes)
}
