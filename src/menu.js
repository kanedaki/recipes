import { reduce as asyncReduce } from 'bluebird'
import { assoc, map, curry, compose, values, sum, keys, mergeWith, add, reduce } from 'ramda'
import { findOrMessage, normalizeWith, keysToPercentage, objNormalizeWith } from './utils'
import { dayCalories, dayPercentageNutrients } from './user'
import { calculateRecipeCalories, findRecipes, calculateRecipeNutrients } from './recipe'
import { numberOfMeals } from './template'

const MAX_ITERATIONS = 200
const NO_RECIPE_ERROR = 'no recipe found'
const getMatchingRecipe = findOrMessage(findRecipes, NO_RECIPE_ERROR)


const calculateDayCalories = day => compose(sum, map(calculateRecipeCalories), values)(day)

const calculateMenuCalories = menu => compose(sum, map(calculateDayCalories))(menu)

const calculateDayNutrients = async (day) => {
  const nutrients = await Promise.all(map(calculateRecipeNutrients, values(day)))
  return reduce(mergeWith(add), {}, nutrients)
}

const calculateMenuNutrientsPercentage = async (menu) => {
  const nutrients = await Promise.all(map(calculateDayNutrients, menu))
  return keysToPercentage(reduce(mergeWith(add), {}, nutrients))
}

const calculateFitness = curry(async (desiredCalories, desiredNutrientsPercentage, menu) => {
  const caloriesPoints = normalizeWith(desiredCalories, calculateMenuCalories(menu))
  const nutrientsPoints = objNormalizeWith(
    desiredNutrientsPercentage,
    await calculateMenuNutrientsPercentage(menu),
  )
  return caloriesPoints + nutrientsPoints
})

const userCaloriesPerMenu = (template, user) => dayCalories(user) * numberOfMeals(template)

const assocRecipeToMeal = currentMenu => async (dayRecipes, meal) => {
  const recipe = await getMatchingRecipe(
    currentMenu,
    dayRecipes,
    meal,
  )
  return assoc(meal, recipe, dayRecipes)
}

export const createDayMenu = async (currentMenu, meals) => {
  const dayMenu = await asyncReduce(keys(meals), assocRecipeToMeal(currentMenu), {})
  currentMenu.push(dayMenu)
  return currentMenu
}

export const createMenu = template =>
  asyncReduce(template, createDayMenu, [])

export const createBalancedMenu = async (template, user) => {
  const desiredCalories = userCaloriesPerMenu(template, user)
  const desiredNutrientsPercentage = dayPercentageNutrients(user)
  const getFitness = calculateFitness(desiredCalories, desiredNutrientsPercentage)
  let bestMenu = await createMenu(template)
  let fitness = getFitness(bestMenu)
  let iteration = 0
  let individualFitness
  let menu
  while (fitness !== 0 && iteration < MAX_ITERATIONS) {
    iteration += 1
    menu = await createMenu(template)
    individualFitness = await getFitness(menu)
    if (individualFitness < fitness) {
      fitness = individualFitness
      bestMenu = menu
    }
  }
  return menu
}
