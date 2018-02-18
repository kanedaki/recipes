import { reduce as asyncReduce } from 'bluebird'
import { pathOr, assoc, map, curry, compose, values, sum, keys } from 'ramda'
import { findMatchingRecipes } from '../businessLogic/recipe'
import { keysToPercentage, findOrMessage } from '../utils'
import { findBestMenu, MAX_ITERATIONS } from '../businessLogic/menu'


const createMenuFactory = (app, {
  getUserSettings, getUserRecipes, findIngredient,
}, services) => {
  /* ***************** calculate calories *************** */
  const getFoodCalories = async (ingredientName) => {
    const ingredient = await findIngredient(ingredientName)
    return pathOr(0, ['general', 'calories', 'value'], ingredient)
  }
  const calculateIngredientCalories = ({ ingredient, qty }) =>
    qty / 100 * getFoodCalories(ingredient)
  const calculateRecipeCalories = recipe =>
    compose(sum, map(calculateIngredientCalories))(recipe.ingredients)
  const calculateDayCalories = day => compose(sum, map(calculateRecipeCalories), values)(day)
  const calculateMenuCalories = menu => compose(sum, map(calculateDayCalories))(menu)


  /* ***************** calculate nutients *************** */
  const calculateMenuNutrientsPercentage = async menu =>
    keysToPercentage(services.calculateMenuNutrients(menu))


  /* **************** create Menu ********************************* */
  async function findRecipes(currentMenu, dayRecipes, meal) {
    const userRecipes = await getUserRecipes()
    return findMatchingRecipes(userRecipes, currentMenu, dayRecipes, meal)
  }
  const NO_RECIPE_ERROR = 'no recipe found'
  const getMatchingRecipe = findOrMessage(findRecipes, NO_RECIPE_ERROR)
  const assocRecipeToMeal = (user, currentMenu) => async (dayRecipes, meal) => {
    const recipe = await getMatchingRecipe(
      currentMenu,
      dayRecipes,
      meal,
    )
    return assoc(meal, recipe, dayRecipes)
  }
  const createDayMenu = curry(async (user, currentMenu, meals) => {
    const dayMenu = await asyncReduce(keys(meals), assocRecipeToMeal(user, currentMenu), {})
    currentMenu.push(dayMenu)
    return currentMenu
  })

  const createMenu = (userDescription, template) =>
    asyncReduce(template, createDayMenu(userDescription), [])

  const makeMenuIterator = (userDescription, template) => {
    const iteration = 0
    return {
      next: async () => {
        if (iteration < MAX_ITERATIONS) {
          const menu = await createMenu(userDescription, template)
          const calories = await calculateMenuCalories(menu)
          const nutrients = await calculateMenuNutrientsPercentage(menu)
          return {
            done: false, value: { menu, calories, nutrients },
          }
        }
        return { done: true }
      },
    }
  }

  const createBalancedMenu = async (username, customTemplate) => {
    const { description: userDescription, template: userTemplate } = await getUserSettings(username)
    const template = customTemplate || userTemplate
    const menuIterator = makeMenuIterator(userDescription, template)
    return findBestMenu(menuIterator, template, userDescription)
  }

  return createBalancedMenu
}

export default createMenuFactory
