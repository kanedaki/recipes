import { and, not, curry, values, allPass, any, sum, map, prop, equals, compose, reduce, mergeWith, add } from 'ramda'
import { getSeason, getRandomFromArray } from './utils'
import { getFoodCalories, getFoodNutrients } from './food'
import { getUserRecipes } from './repo/mongo-repo'

const hasRecipeOnDay = curry((recipe, dayRecipes) =>
  values(dayRecipes).map(r => r.name).includes(recipe.name))

const notIncludedAlready = ({ currentMenu, dayRecipes }) => recipe => and(
  not(hasRecipeOnDay(recipe, dayRecipes)),
  not(any(hasRecipeOnDay(recipe), currentMenu)),
)

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

export async function findRecipes(currentMenu, dayRecipes, meal) {
  const userRecipes = await getUserRecipes()
  const validRecipes = userRecipes.filter(findRecipe({ currentMenu, dayRecipes, meal }))
  return getRandomFromArray(validRecipes)
}
