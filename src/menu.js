import {
  allPass,
  all,
  propEq,
  and,
  any,
  sum,
  map,
  prop,
  equals,
  compose,
  not,
  path,
  curry,
  values,
  keys,
} from 'ramda'
import {
  getRandomNumber,
  getRandomFromArray,
  findOrMessage,
  getSeason,
} from './utils'
import { getRecipesFromUser, findRecipeByName } from './repo/fileSystemRepo'
import { lunch, dinner } from './enums/meals'
import { tasaMetabolismoBasal, activityFactor } from './constraints/calories'

export const matchSeason = season =>
  compose(any(equals(season)), prop('seasons'))

export const matchMeal = ({ meal }) => compose(any(equals(meal)), prop('meal'))

const isDifferentRecipe = (meal, recipeName) =>
  compose(not, equals(recipeName), path([meal, 'name']))

const notIncludedAlready = ({ currentMenu, dayRecipes }) => recipe => {
  const recipeName = prop('name', recipe)
  if (values(dayRecipes).includes(recipe)) return false
  return all(
    allPass([
      isDifferentRecipe(lunch, recipeName),
      isDifferentRecipe(dinner, recipeName),
    ]),
  )(currentMenu)
}

const MAX_ITERATIONS = 200

const getFoodCalories = food => getRandomNumber(200)

const calculateIngredientCalories = ({ ingredient, qty }) =>
  qty / 100 * getFoodCalories(ingredient)

const calculateRecipeCalories = recipe =>
  compose(sum, map(calculateIngredientCalories))(recipe.ingredients)

const calculateDayCalories = day =>
  compose(sum, map(calculateRecipeCalories), values)(day)

const calculateCalories = menu => compose(sum, map(calculateDayCalories))(menu)

const calculateFitness = curry((desiredCalories, menu) =>
  Math.abs(desiredCalories - calculateCalories(menu)),
)

const numberOfMeals = template =>
  template.reduce((meals, day) => meals + Object.keys(day).length, 0)

const userCaloriesPerMenu = (template, { activity, ...user }) =>
  (activityFactor(activity) + tasaMetabolismoBasal(user)) *
  numberOfMeals(template)

export const createBalancedMenu = (template, user) => {
  const desiredCalories = userCaloriesPerMenu(template, user)
  const getFitness = calculateFitness(desiredCalories)
  let bestMenu = createMenu(template)
  let fitness = getFitness(bestMenu)
  let iteration = 0
  let individualFitness
  let menu
  while (fitness !== 0 && iteration < MAX_ITERATIONS) {
    iteration++
    menu = createMenu(template)
    individualFitness = getFitness(menu)
    if (individualFitness < fitness) {
      fitness = individualFitness
      bestMenu = menu
    }
  }
  return menu
}

export function createMenu(template) {
  return template.reduce((currentMenu, meals) => {
    const dayRecipes = keys(meals).reduce((dayRecipes, meal) => {
      dayRecipes[meal] = getRecipeForMealType({
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

const NO_RECIPE_ERROR = 'no recipe found'
const getRecipeForMealType = findOrMessage(findRecipes, NO_RECIPE_ERROR)

const findRecipe = options =>
  allPass([
    matchMeal(options),
    matchSeason(getSeason()),
    notIncludedAlready(options),
  ])

function findRecipes(options) {
  const recipes = getRecipesFromUser()
  const validRecipes = recipes.filter(findRecipe(options))
  return getRandomFromArray(validRecipes)
}
