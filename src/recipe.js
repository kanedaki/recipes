import { allPass, any, sum, map, prop, equals, compose, reduce, mergeWith, add } from 'ramda'
import { getSeason, getRandomFromArray } from './utils'
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


export const calculateRecipeNutrients = async (recipe) => {
  const nutrients = await Promise.all(map(getFoodNutrients, prop('ingredients', recipe)))
  return reduce(mergeWith(add), {}, nutrients)
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