import { map, curry, compose, not, equals, prop, values, allPass, sum, keys, all } from 'ramda'
import { findOrMessage } from './utils'
import * as meals from './enums/meals'
import { dayCalories } from './user'
import { calculateRecipeCalories, findRecipes } from './recipe'
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

const calculateCalories = menu => compose(sum, map(calculateDayCalories))(menu)

const calculateFitness = curry((desiredCalories, menu) =>
  Math.abs(desiredCalories - calculateCalories(menu)))

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
  const getFitness = calculateFitness(desiredCalories)
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
