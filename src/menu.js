import { map, curry, compose, not, equals, prop, values, allPass, sum, keys, all, mergeWith, add, reduce } from 'ramda'
import { findOrMessage, normalizeWith, keysToPercentage, objNormalizeWith } from './utils'
import * as meals from './enums/meals'
import { dayCalories, dayPercentageNutrients } from './user'
import { calculateRecipeCalories, findRecipes, calculateRecipeNutrients } from './recipe'
import { numberOfMeals } from './template'

const MAX_ITERATIONS = 200
const NO_RECIPE_ERROR = 'no recipe found'
const getMatchingRecipe = findOrMessage(findRecipes, NO_RECIPE_ERROR)

const hasRecipeOnMeal = curry((recipeName, meal) => compose(not, equals(recipeName), prop(meal)))

export const notIncludedAlready = ({ currentMenu, dayRecipes }) => (recipe) => {
  if (values(dayRecipes).includes(recipe)) return false
  const notIncludedOnDay = allPass(map(hasRecipeOnMeal(recipe), keys(meals)))
  return all(notIncludedOnDay)(currentMenu)
}

const calculateDayCalories = day => compose(sum, map(calculateRecipeCalories), values)(day)

const calculateMenuCalories = menu => compose(sum, map(calculateDayCalories))(menu)

const calculateDayNutrients = day =>
  reduce(mergeWith(add), {}, map(calculateRecipeNutrients, values(day)))

const calculateMenuNutrientsPercentage = menu =>
  keysToPercentage(reduce(mergeWith(add), {}, map(calculateDayNutrients, menu)))

const calculateFitness = curry((desiredCalories, desiredNutrientsPercentage, menu) => {
  const caloriesPoints = normalizeWith(desiredCalories, calculateMenuCalories(menu))
  const nutrientsPoints = objNormalizeWith(
    desiredNutrientsPercentage,
    calculateMenuNutrientsPercentage(menu),
  )
  return caloriesPoints + nutrientsPoints
})

const userCaloriesPerMenu = (template, user) => dayCalories(user) * numberOfMeals(template)

export function createMenu(template) {
  return template.reduce((currentMenu, meals) => {
    const dayRecipes = keys(meals).reduce((dayRecipes, meal) => {
      // eslint-disable-next-line
      dayRecipes[meal] = getMatchingRecipe({
        meal,
        currentMenu,
        dayRecipes,
      })
      return dayRecipes
    }, {})
    currentMenu.push(dayRecipes)
    return currentMenu
  }, [])
}
export const createBalancedMenu = (template, user) => {
  const desiredCalories = userCaloriesPerMenu(template, user)
  const desiredNutrientsPercentage = dayPercentageNutrients(user)
  const getFitness = calculateFitness(desiredCalories, desiredNutrientsPercentage)
  let bestMenu = createMenu(template)
  let fitness = getFitness(bestMenu)
  let iteration = 0
  let individualFitness
  let menu
  while (fitness !== 0 && iteration < MAX_ITERATIONS) {
    iteration += 1
    menu = createMenu(template)
    individualFitness = getFitness(menu)
    if (individualFitness < fitness) {
      fitness = individualFitness
      bestMenu = menu
    }
  }
  return menu
}
