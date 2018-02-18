import { and, not, curry, values, allPass, any, prop, equals, compose } from 'ramda'
import { getSeason, getRandomFromArray } from '../utils'
import { getUserRecipes } from '../repo/mongo-repo'

const hasRecipeOnDay = curry((recipe, dayRecipes) =>
  values(dayRecipes).map(r => r.name).includes(recipe.name))

const notIncludedAlready = ({ currentMenu, dayRecipes }) => recipe => and(
  not(hasRecipeOnDay(recipe, dayRecipes)),
  not(any(hasRecipeOnDay(recipe), currentMenu)),
)

export const matchSeason = season =>
  compose(any(equals(season)), prop('seasons'))

export const matchMeal = ({ meal }) => compose(any(equals(meal)), prop('meal'))

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