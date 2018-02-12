import { allPass, any, sum, map, prop, equals, compose } from 'ramda'
import { getSeason, getRandomFromArray, sumKeys } from './utils'
import { getFoodCalories, getFoodNutrients } from './food'
import { notIncludedAlready } from './menu'
import { getRecipesFromUser } from './repo/fileSystemRepo'

export const matchSeason = season =>
  compose(any(equals(season)), prop('seasons'))

export const matchMeal = ({ meal }) => compose(any(equals(meal)), prop('meal'))

const calculateIngredientCalories = ({ ingredient, qty }) =>
  qty / 100 * getFoodCalories(ingredient)

export const calculateRecipeCalories = recipe =>
  compose(sum, map(calculateIngredientCalories))(recipe.ingredients)

export const calculateRecipeNutrients = (recipe) => {
  console.log('hoy', recipe)
  return map(compose(sumKeys, getFoodNutrients))(recipe.ingredients)
}

const findRecipe = options =>
  allPass([
    matchMeal(options),
    matchSeason(getSeason()),
    notIncludedAlready(options),
  ])

export function findRecipes(options) {
  const recipes = getRecipesFromUser()
  const validRecipes = recipes.filter(findRecipe(options))
  return getRandomFromArray(validRecipes)
}
