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
  const calculateIngredientCalories = async ({ ingredient, qty }) => qty / 100 * await getFoodCalories(ingredient)
  const calculateRecipeCalories = async (recipe) => {
    const ingredientCalories = await Promise.all(map(calculateIngredientCalories, recipe.ingredients))
    return sum(ingredientCalories)
  }
  const calculateDayCalories = async (day) => {
    const recipeCalories = await Promise.all(map(calculateRecipeCalories, values(day)))
    return sum(recipeCalories)
  }
  const calculateMenuCalories = async (menu) => {
    const dayCalories = await Promise.all(map(calculateDayCalories, menu))
    return sum(dayCalories)
  }


  /* ***************** calculate nutients *************** */
  const calculateMenuNutrientsPercentage = async menu =>
    keysToPercentage(await services.calculateMenuNutrients(menu))


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

  /* const makeMenuIterator = (userDescription, template) => {
    let iteration = 0
    return {
      [Symbol.iterator]() {
        return {
          next: async function* () {
            console.log('wwwwww')
            iteration++
            if (iteration < MAX_ITERATIONS) {
              console.log('ite', iteration)
              const menu = await createMenu(userDescription, template)
              const calories = await calculateMenuCalories(menu)
              const nutrients = await calculateMenuNutrientsPercentage(menu)
              yield { done: false, value: { menu, calories, nutrients } }
            } else {
              yield { done: true }
            }
          }
        }
      }
    }
  } */

  /* const makeMenuIterator = (userDescription, template) => {
    let iteration = 0
    return {
      [Symbol.iterator]: async function* () {
        iteration++
        if (iteration < MAX_ITERATIONS) {
          console.log('ite', iteration)
          const menu = await createMenu(userDescription, template)
          const calories = await calculateMenuCalories(menu)
          const nutrients = await calculateMenuNutrientsPercentage(menu)
          yield {
            done: false, value: { menu, calories, nutrients },
          }
        } else {
          console.log('end')
          yield { done: true, value: undefined }
        }
      },
    }
  } */

  const makeMenuIterator = (userDescription, template) => {
    let iteration = 0
    return async () => {
      iteration += 1
      const menu = await createMenu(userDescription, template)
      const calories = await calculateMenuCalories(menu)
      const nutrients = await calculateMenuNutrientsPercentage(menu)
      return {
        menu, calories, nutrients, iteration,
      }
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
