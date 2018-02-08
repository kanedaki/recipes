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
} from 'ramda'
import {
  getRandomNumber,
  getRandomFromArray,
  findOrMessage,
  getSeason,
} from './utils'
import MealTypes from './enums/mealTypes'
import { getRecipesFromUser, findRecipeByName } from './repo/fileSystemRepo'
import { lunch, dinner } from './enums/meals'
import { tasaMetabolismoBasal, activityFactor } from './constraints/calories'

export const matchMealType = ({ mealType }) => propEq('mealType', mealType)

export const matchSeason = season =>
  compose(any(equals(season)), prop('seasons'))

export const matchMeal = ({ meal }) => compose(any(equals(meal)), prop('meal'))

const isDifferentLunchRecipe = recipeName =>
  compose(not, equals(recipeName), path(['lunch', 'name']))

const isDifferentDinnerRecipe = recipeName =>
  compose(not, equals(recipeName), path(['dinner', 'name']))

const notIncludedAlready = ({ currentMenu }) => recipe => {
  const recipeName = prop('name', recipe)
  return all(
    allPass([
      isDifferentLunchRecipe(recipeName),
      isDifferentDinnerRecipe(recipeName),
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

export const createBalancedMenu = (template, { activity, ...user }) => {
  const userCaloriesPerMenu =
    (activityFactor(activity) + tasaMetabolismoBasal(user)) *
    numberOfMeals(template)
  const getFitness = calculateFitness(userCaloriesPerMenu)
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
  return { menu, fitness }
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

const findRecipe = options =>
  allPass([
    matchMeal(options),
    // matchMealType(options),
    matchSeason(getSeason()),
    notIncludedAlready(options),
  ])

function findRecipes(options) {
  if (!MealTypes.includes(options.mealType)) return undefined
  const recipes = getRecipesFromUser()
  const validRecipes = recipes.filter(findRecipe(options))
  return getRandomFromArray(validRecipes)
}
