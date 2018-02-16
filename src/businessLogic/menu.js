import { reduce as asyncReduce } from 'bluebird'
import { prop, mapObjIndexed, assoc, map, curry, compose, values, sum, keys, mergeWith, add, reduce } from 'ramda'
import { findOrMessage, normalizeWith, keysToPercentage, objNormalizeWith, filterWithKeys } from '../utils'
import { dayCalories, dayPercentageNutrients } from './user'
import { calculateRecipeCalories, findRecipes, calculateRecipeNutrients } from './recipe'
import { numberOfMeals } from './template'
import { getUserSettings, insertMenuIntoHistoric, insertNutrientsIntoHistoric, getUserNutrientsBalance, insertUserNutrientsBalance } from '../repo/mongo-repo'

const MAX_ITERATIONS = 200
const NO_RECIPE_ERROR = 'no recipe found'
const getMatchingRecipe = findOrMessage(findRecipes, NO_RECIPE_ERROR)


const calculateDayCalories = day => compose(sum, map(calculateRecipeCalories), values)(day)

const calculateMenuCalories = menu => compose(sum, map(calculateDayCalories))(menu)

const calculateDayNutrients = async (day) => {
  const nutrients = await Promise.all(map(calculateRecipeNutrients, values(day)))
  return reduce(mergeWith(add), {}, nutrients)
}

const calculateMenuNutrients = async (menu) => {
  const nutrients = await Promise.all(map(calculateDayNutrients, menu))
  return reduce(mergeWith(add), {}, nutrients)
}

const calculateMenuNutrientsPercentage = async menu =>
  keysToPercentage(calculateMenuNutrients(menu))

const calculateFitness = curry(async (desiredCalories, desiredNutrientsPercentage, menu) => {
  const caloriesPoints = normalizeWith(desiredCalories, calculateMenuCalories(menu))
  const nutrientsPoints = objNormalizeWith(
    desiredNutrientsPercentage,
    await calculateMenuNutrientsPercentage(menu),
  )
  return caloriesPoints + nutrientsPoints
})

const userCaloriesPerMenu = (template, userDescription) =>
  dayCalories(userDescription) * numberOfMeals(template)

const assocRecipeToMeal = (user, currentMenu) => async (dayRecipes, meal) => {
  const recipe = await getMatchingRecipe(
    currentMenu,
    dayRecipes,
    meal,
  )
  return assoc(meal, recipe, dayRecipes)
}

export const createDayMenu = curry(async (user, currentMenu, meals) => {
  const dayMenu = await asyncReduce(keys(meals), assocRecipeToMeal(user, currentMenu), {})
  currentMenu.push(dayMenu)
  return currentMenu
})

export const createMenu = (userDescription, template) =>
  asyncReduce(template, createDayMenu(userDescription), [])

export const createBalancedMenu = async (username, customTemplate) => {
  const { description: userDescription, template: userTemplate } = await getUserSettings(username)
  const template = customTemplate || userTemplate
  const desiredCalories = userCaloriesPerMenu(template, userDescription)
  const desiredNutrientsPercentage = dayPercentageNutrients(userDescription)
  const getFitness = calculateFitness(desiredCalories, desiredNutrientsPercentage)
  let bestMenu = await createMenu(userDescription, template)
  let fitness = getFitness(bestMenu)
  let iteration = 0
  let individualFitness
  let menu
  while (fitness !== 0 && iteration < MAX_ITERATIONS) {
    iteration += 1
    menu = await createMenu(userDescription, template)
    individualFitness = await getFitness(menu)
    if (individualFitness < fitness) {
      fitness = individualFitness
      bestMenu = menu
    }
  }
  return menu
}

const removeNotConsumed = (menu, template) => menu.map((dayMenu, i) => {
  const dayTemplate = template[i] || {}
  return filterWithKeys(key => (prop(key, dayTemplate)), dayMenu)
})

const updateNutrientsAverage = async (username, nutrients) => {
  const currentBalance = await getUserNutrientsBalance(username)
  if (!currentBalance) {
    return insertUserNutrientsBalance(username, nutrients)
  }
  const newBalance = mapObjIndexed((value, key) =>
    nutrients[key] * 0.7 + value * 0.3, currentBalance)
  return insertUserNutrientsBalance(username, newBalance)
}


export const insertMenuAndNutrientsIntoHistoric = async (username, menu, template) => {
  const consumedMenu = removeNotConsumed(menu, template)
  const nutrients = await calculateMenuNutrients(consumedMenu)
  return Promise.all([
    insertMenuIntoHistoric(username, consumedMenu),
    insertNutrientsIntoHistoric(username, nutrients),
    updateNutrientsAverage(username, nutrients)])
}
